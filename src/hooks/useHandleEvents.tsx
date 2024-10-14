import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../config/firebase";
import useCreateEvent from "./useCreateEvent";
import useFirestore from "./useFirestore";
import { useHistory } from "react-router-dom";
import { textIndexToArray } from "../helpers/Helpers";
import nodeMailApi from "../config/nodemail";
import { AuthContext } from "../context/AuthContext";

const useHandleEvents = () => {
  const { currentUser } = useContext(AuthContext);
  // const { userData } = useFirebaseAuth();
  const userData = currentUser?.data;
  const {
    addData: createRequest,
    error: requestError,
    loading: requestLoading,
  } = useFirestore("requests");
  const { createEvent, error: eventError } = useCreateEvent();
  const history = useHistory();

  const [isPaid, setIsPaid] = useState(false);
  const [imgUrl, setImgUrl] = useState<File | null>(null);
  const [emailMessage, setEmailMessage] = useState<string>();

  //   function setPaid(value: boolean) {
  //     setIsPaid(value);
  //   }

  function keywordsToArray(str: string) {
    // str.toLowerCase();
    const keywordsArray = str
      .toLowerCase()
      .split(",")
      .map((word) => word.trim());
    return keywordsArray;
  }

  const handleCreateEvent = async (data: any) => {
    const hostId = auth.currentUser?.uid!;
    const hostName = `${userData?.fname} ${userData?.lname}`;
    // const venueId = id;
    const status = "for confirmation";
    // const venueName = venueData?.name;
    // const venueOwnerId = venueData?.user_id;

    // const convertDate = Timestamp.fromDate(eventDate);
    // const convertDate = new Date(eventDate!);

    // Combine the state and any other data needed
    const eventDataToSubmit = {
      // ...eventData,
      ...data,
      // ...register,
      // eventDate: convertDate,
      // venue: venueName,
      // venue_id: venueId,
      host_id: hostId,
      host_name: hostName,
      status: status,
      isArchived: false,
      // img_url: imageUrl,
      // img_path: imagePath,
      is_confirmed: false,
      is_paid: isPaid,
      is_transaction_complete: false,
      nameIndex: textIndexToArray(data.title),
      keywords: keywordsToArray(data.keywords),

      // createdAt: serverTimestamp(),
      //   updatedAt: serverTimestamp(),
    };

    Swal.fire({
      title: "Do you want to save?",
      showCancelButton: true,
      confirmButtonText: "Save",
      heightAuto: false,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          heightAuto: false,
          position: "top-right",
          title: "Uploading..",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(async (result) => {
          console.log("imgUrl: ", imgUrl);

          /* Read more about handling dismissals below */
          await createEvent(imgUrl, Date.now(), eventDataToSubmit)
            .then(async (res) => {
              console.log("response: ", res);
              console.log("Event Error", eventError);

              if (res) {
                await createRequest({
                  event_title: data.title,
                  event_id: res,
                  event_date: data.event_date,
                  event_description: data.description,
                  event_start_date: data.start_time,
                  event_end_date: data.end_time,
                  is_paid: isPaid,
                  host_id: hostId,
                  host_name: hostName,
                  host_email: currentUser?.email,
                  status: "for verification",
                  is_confirmed: false,
                  is_transaction_complete: false,
                })
                  .then(async (res) => {
                    console.log("response: ", res);
                    console.log("Request Error", requestError);

                    const payload = {
                      name: userData?.fname,
                      subject: "New Course Created",
                      email: currentUser?.email,
                      message: emailMessage,
                    };

                    nodeMailApi.post("api/v1/send-email", payload);

                    Swal.fire({
                      title: "Success!",
                      text: "Event created successfully",
                      icon: "success",
                      confirmButtonText: "OK",
                      heightAuto: false,
                    }).then(() => {
                      history.push("/host/event-list");
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    Swal.fire({
                      title: "Error!",
                      text: "Something went wrong, please try again",
                      icon: "error",
                      confirmButtonText: "OK",
                      heightAuto: false,
                    });
                  });
              }
            })
            .catch(() => {
              Swal.fire({
                title: "Error!",
                text: "Something went wrong, please try again",
                icon: "error",
                confirmButtonText: "OK",
                heightAuto: false,
              });
            });
        });
      }
    });
  };

  return {
    handleCreateEvent,
    setImgUrl,
    setIsPaid,
    setEmailMessage,
  };
};

export default useHandleEvents;

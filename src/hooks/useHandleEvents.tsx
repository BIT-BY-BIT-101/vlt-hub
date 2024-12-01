import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../config/firebase";
import useCreateEvent from "./useCreateEvent";
import useFirestore from "./useFirestore";
import { useHistory } from "react-router-dom";
import { textIndexToArray } from "../helpers/Helpers";
import nodeMailApi from "../config/nodemail";
import { AuthContext } from "../context/AuthContext";
import { getAuth } from "firebase/auth";
import { set } from "react-hook-form";

const useHandleEvents = () => {
  const { currentUser } = useContext(AuthContext);
  // const { userData } = useFirebaseAuth();
  const userData = currentUser?.data;
  const { deleteData: deleteEvent } = useFirestore("events");
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

    console.log(data);

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
      if (result.isConfirmed) {
        // Show loading until everything completes
        Swal.fire({
          heightAuto: false,
          position: "top-right",
          title: "Uploading..",
          didOpen: () => {
            Swal.showLoading(); // Keep the loading animation active
          },
        });

        // Start the async operations
        (async () => {
          try {
            // First async task: createEvent
            const res = await createEvent(
              imgUrl,
              Date.now(),
              eventDataToSubmit
            );

            console.table(data);

            if (res) {
              // Second async task: createRequest
              await createRequest({
                event_title: data.title,
                event_id: res,
                date_from: data.date_from,
                date_to: data.date_to,
                ingress_date: data.ingress_date,
                egress_date: data.egress_date,
                number_of_attendees: data.number_of_attendees,
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
              });

              // Send email notification
              const payload = {
                name: userData?.fname,
                subject: "New Course Created",
                email: currentUser?.email,
                message: emailMessage,
              };

              const token = await getAuth().currentUser?.getIdToken(true);

              nodeMailApi.post("api/v1/mail/send-email", payload, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });

              // Show success message
              Swal.fire({
                title: "Success!",
                text: "Event created successfully",
                icon: "success",
                confirmButtonText: "OK",
                heightAuto: false,
              }).then(() => {
                history.push("/host/event-list");
              });
            }
          } catch (error) {
            console.error("Error: ", error);

            // Show error message if something goes wrong
            Swal.fire({
              title: "Error!",
              text: "Something went wrong, please try again",
              icon: "error",
              confirmButtonText: "OK",
              heightAuto: false,
            });
          }
        })();
      }
    });
  };

  const handleDeleEvent = async (id: string) => {
    Swal.fire({
      title: "Are you sure you want to delete this event?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete",
      iconColor: "red",
      confirmButtonColor: "red",
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // Show loading until everything completes
        Swal.fire({
          heightAuto: false,
          position: "top-right",
          title: "Removing Event from the lists..",
          didOpen: () => {
            Swal.showLoading(); // Keep the loading animation active
          },
        }); //end of block
        (async () => {
          try {
            await deleteEvent(id);

            // Show success message
            Swal.fire({
              title: "Success!",
              text: "Event deleted successfully",
              icon: "success",
              confirmButtonText: "Done",
              heightAuto: false,
            }).then(() => {
              history.push("/host/event-list");
            });
          } catch (err) {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong, please try again",
              icon: "error",
              confirmButtonText: "Done",
              heightAuto: false,
            });
            console.error("Error Deleting Event: ", err);
            throw err;
          } //end of block
        })();
      } // end of if block
    });
  };

  return {
    handleCreateEvent,
    handleDeleEvent,
    setImgUrl,
    setIsPaid,
    setEmailMessage,
  };
};

export default useHandleEvents;

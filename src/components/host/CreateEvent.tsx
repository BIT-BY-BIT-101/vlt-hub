import {
  IonCard,
  IonLabel,
  IonInput,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonButton,
  IonTextarea,
} from "@ionic/react";
import { ChangeEvent, useEffect, useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import { useForm } from "react-hook-form";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { auth } from "../../config/firebase";
import { useHistory, useParams } from "react-router";
import useQueryDoc from "../../hooks/useQueryDoc";
import useFirebaseStorage from "../../hooks/useFirestorage";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import useCreateEvent from "../../hooks/useCreateEvent";

type RouteParams = {
  id: string;
};

function CreateEvent() {
  const { id } = useParams<RouteParams>();
  // const {
  //   uploadImage,
  //   imageUrl,
  //   error: uploadError,
  //   imageName,
  // } = useFirebaseStorage("events/image");
  const { data: venueData } = useQueryDoc("venues", id);
  // const { data: venueData } = useQuery("venue", "id", "==", id);
  const { userData } = useFirebaseAuth();
  // const { addData: createEvent } = useFirestore(`venues/${id}/events`);
  const { addData: createRequest, error: requestError } =
    useFirestore("requests");
  const {
    createEvent,
    error: eventError,
    imageUrl,
    imagePath,
  } = useCreateEvent();
  // const { photos, takePhoto, uploading, imageUrl } =
  //   usePhotoUpload("events/image");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formError },
  } = useForm();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    host_id: "",
    host_name: "",
    eventDate: "",
    venueType: "On-site",
    venue_Id: "",
    venue: "",
    platform: "",
    startTime: "",
    endTime: "",
  });
  const [eventDate, setEventDate] = useState<string>("");
  const [venue, setVenue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [additionalVenueOptions, setAdditionalVenueOptions] = useState(false);
  const [additionalOnlineOptions, setAdditionalOnlineOptions] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>();
  // const [imagePreviewUrl, setImagePreviewUrl] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<File | null>(null);

  const history = useHistory();

  // useEffect(() => {
  //   console.log(eventDate);
  // }, [eventDate]);

  const customVenueFormatOptions = {
    header: "Venue Format",
    message: "Choose mode",
    translucent: true,
  };
  const customVenueOptions = {
    header: "Venue",
    message: "Pick Location",
    translucent: true,
  };
  const customVenuePlatformOptions = {
    header: "Online Platform",
    message: "Choose Meeting Platform",
    translucent: true,
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);

    if (file) {
      const img = file;
      const imageUrl = URL.createObjectURL(file);
      console.log("image: ", img);
      console.log("url: ", imageUrl);
      setImgUrl(img);
      setImagePreviewUrl(imageUrl);
    } else {
      setImagePreviewUrl(null);
      setImgUrl(null);
    }
  };
  // const handleUpload = async () => {
  //   await uploadImage(imgUrl, Date.now()).then((res) => {
  //     Swal.fire({
  //       heightAuto: false,
  //       position: "top-right",
  //       title: "Uploading..",
  //       timer: 2000,
  //       timerProgressBar: true,
  //       didOpen: () => {
  //         Swal.showLoading();
  //       },
  //     }).then((result) => {
  //       /* Read more about handling dismissals below */
  //       // console.log(uploadError);

  //       if (uploadError) {
  //         Swal.fire({
  //           heightAuto: false,
  //           title: "Oops!, something went wrong while uploading image",
  //           icon: "error",
  //           timer: 1000,
  //           position: "top-right",
  //           showConfirmButton: false,
  //         });
  //       } else {
  //         Swal.fire({
  //           icon: "success",
  //           heightAuto: false,
  //           timer: 1000,
  //           position: "top-right",
  //           showConfirmButton: false,
  //         });
  //       }

  //       if (result.dismiss === Swal.DismissReason.timer) {
  //         console.log("I was closed by the timer");
  //       }
  //     });
  //   });
  // };

  const handleVenueChange = (event: CustomEvent) => {
    const selectedVenue = event.detail.value;
    setVenue(selectedVenue);

    setAdditionalVenueOptions(selectedVenue === "on-site");

    setAdditionalOnlineOptions(selectedVenue === "online");
  };

  const handleOnlineOptionChange = (event: CustomEvent) => {
    const selectedOnlineOption = event.detail.value;
    console.log("Selected Online Option:", selectedOnlineOption);
  };

  console.log(venueData);

  const onSubmit = async (data: any) => {
    const hostId = auth.currentUser?.uid!;
    const hostName = `${userData?.fname} ${userData?.lname}`;
    const venueId = id;
    const status = "unpublished";
    const venueName = venueData.name;
    const venueOwnerId = venueData.user_id;

    // const convertDate = Timestamp.fromDate(eventDate);
    // const convertDate = new Date(eventDate!);

    // Combine the state and any other data needed
    const eventDataToSubmit = {
      // ...eventData,
      ...data,
      // ...register,
      // eventDate: convertDate,
      venue: venueName,
      venue_id: venueId,
      host_id: hostId,
      host_name: hostName,
      status: status,
      isArchived: false,
      img_url: imageUrl,
      img_path: imagePath,
      is_confirmed: false,
      venue_owner_id: venueOwnerId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    console.log(id);
    console.log(venueData.name);
    console.log(data);

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
          /* Read more about handling dismissals below */
          await createEvent(imgUrl, Date.now(), eventDataToSubmit).then(
            async (res) => {
              console.log("response: ", res);
              console.log(eventError);

              if (eventError === null) {
                await createRequest({
                  event_title: data.title,
                  event_id: res.id,
                  event_date: data.event_date,
                  event_description: data.description,
                  host_id: hostId,
                  host_name: hostName,
                  venue_id: venueId,
                  venue_owner_id: venueOwnerId,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp(),
                });
                Swal.fire({
                  title: "Success!",
                  text: "Event created successfully",
                  icon: "success",
                  confirmButtonText: "ok",
                  heightAuto: false,
                }).then(() => {
                  history.push("/host/event-list");
                });
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "Something went wrong, please try again",
                  icon: "error",
                  confirmButtonText: "ok",
                  heightAuto: false,
                });
              }
            }
          );
        });
      }
    });

    // const docRef = doc(db, `venues`, id);
    // const colRef = collection(docRef, "events");
    // await addDoc(colRef, eventDataToSubmit);

    // Optionally, you can reset the form after successful submission
    reset();

    // Log success or navigate to another page
  };

  // console.log("Photot: ", photos);

  return (
    <IonCard className="hhome-card-container">
      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Upload your poster:</span>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hhome-form-input-file"
        />
        {imagePreviewUrl && (
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className="hhome-image-preview"
          />
        )}
      </IonLabel>
      {/* <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Upload your poster:</span>
        {imagePreviewUrl && (
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className="hhome-image-preview"
          />
        )}
        {photos && (
          <img
            src={photos?.dataUrl}
            alt="Preview"
            className="hhome-image-preview"
          />
        )}
        {uploading ? (
          <IonButton disabled>...Upoloading</IonButton>
        ) : (
          <IonButton onClick={takePhoto}>Upload Photo</IonButton>
          // <IonButton onClick={handleCamera}>Upload Photo</IonButton>
        )}
      </IonLabel> */}

      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Event Title:</span>
        <IonInput
          className="hhome-form-input"
          type="text"
          required
          {...register("title", { required: true })}
        />
      </IonLabel>
      {formError.title?.type === "required" && (
        <p role="alert" className="text-color-danger">
          Please enter a title
        </p>
      )}

      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Add a description:</span>
        {/* <IonInput
          className="hhome-form-input"
          type="text"
          required
          {...register("description")}
          /> */}
        <IonTextarea
          className="hhome-form-input"
          autoGrow={true}
          required
          {...register("description", { required: true })}
        />
      </IonLabel>
      {formError.description?.type === "required" && (
        <p role="alert" className="text-color-danger">
          Please enter a title
        </p>
      )}

      {/* <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Fee:</span>
        <IonInput
          className="hhome-form-input"
          type="number"
          required
          {...register("event_fee")}
        />
      </IonLabel> */}

      <div className="date-time-row">
        <div className="date-time-item">
          <IonLabel className="hhome-form-label date-time-label">
            <span className="hhome-form-title">Event Date:</span>
            <div className="date-time-container">
              <IonDatetimeButton datetime="date"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  {...register("event_date", { required: true })}
                  // onIonChange={(e) => setEventDate(e.detail.value)}
                  showDefaultButtons={true}
                  presentation="date"
                  id="date"
                  min="2023-12-01"
                  max="2025-12-31"
                ></IonDatetime>
              </IonModal>
            </div>
          </IonLabel>
          {formError.eventDate?.type === "required" && (
            <p role="alert" className="text-color-danger">
              Please enter a date
            </p>
          )}
        </div>
        <div className="date-time-item">
          <IonLabel className="hhome-form-label date-time-label">
            <span className="hhome-form-title">Start Time:</span>
            <div className="date-time-container">
              <IonDatetimeButton datetime="start"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  {...register("start_time", { required: true })}
                  // onIonChange={(e) => setEventDate(e.detail.value)}
                  showDefaultButtons={true}
                  presentation="time"
                  id="start"
                  min="2023-12-01"
                  max="2025-12-31"
                ></IonDatetime>
              </IonModal>
            </div>
          </IonLabel>
          {formError.startTime?.type === "required" && (
            <p role="alert" className="text-color-danger">
              Please enter a start time
            </p>
          )}
        </div>
        <div className="date-time-item">
          <IonLabel className="hhome-form-label date-time-label">
            <span className="hhome-form-title">End Time:</span>
            <div className="date-time-container">
              <IonDatetimeButton datetime="end"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  {...register("end_time", { required: true })}
                  // onIonChange={(e) => setEventDate(e.detail.value)}
                  showDefaultButtons={true}
                  presentation="time"
                  id="end"
                  min="2023-12-01"
                  max="2025-12-31"
                ></IonDatetime>
              </IonModal>
            </div>
          </IonLabel>
          {formError.endTime?.type === "required" && (
            <p role="alert" className="text-color-danger">
              Please enter an end time
            </p>
          )}
        </div>
      </div>

      <IonButton
        type="submit"
        expand="full"
        fill="clear"
        onClick={handleSubmit(onSubmit)}
        className="hsubmit-btn"
        // disabled={!imageName}
      >
        <span className="hsubmit-txt">Submit</span>
      </IonButton>
      {/* <IonButton
        type="submit"
        expand="full"
        fill="clear"
        onClick={handleUpload}
        className="hsubmit-btn"
      >
        <span className="hsubmit-txt">Upload</span>
      </IonButton> */}
    </IonCard>
  );
}

export default CreateEvent;

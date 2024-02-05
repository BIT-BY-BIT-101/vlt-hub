import {
  IonCard,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonButton,
  IonTextarea,
} from "@ionic/react";
import React, { ChangeEvent, useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import { useForm } from "react-hook-form";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { auth, db } from "../../config/firebase";
import useCamera from "../../hooks/useCamera";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { addDoc, collection, doc } from "firebase/firestore";
import { useParams } from "react-router";

type RouteParams = {
  id: string;
};

function CreateEvent() {
  const { id } = useParams<RouteParams>();
  const { userData } = useFirebaseAuth();
  // const { addData: createEvent } = useFirestore(`venues/${id}/events`);
  const { addData: createEvent } = useFirestore("events");
  const { data: venueData } = useFirestore("venue");
  const { photos, takePhoto } = useCamera();
  const { register, handleSubmit, reset } = useForm();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    host_id: "",
    host_name: "",
    eventDate: "",
    imgUrl: "",
    venueType: "",
    venue: "",
    platform: "",
    startTime: "",
    endTime: "",
  });
  const [venue, setVenue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [additionalVenueOptions, setAdditionalVenueOptions] = useState(false);
  const [additionalOnlineOptions, setAdditionalOnlineOptions] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>(null);
  // const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

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
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    } else {
      setImagePreviewUrl(null);
    }
  };

  // const handleCameera = () => {
  //   takePhoto();
  //   setImagePreviewUrl(photos[0].webviewPath);

  //   // if (photos.length > 0) {
  //   //   setImagePreviewUrl(photos[0].webviewPath);
  //   // }
  // };
  const handleCameera = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      allowEditing: false,
      quality: 90,
    });

    const fileName = Date.now() + ".jpeg";
    const newPhotos = photo.webPath;
    setImagePreviewUrl(newPhotos);
    console.log(newPhotos);
  };

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

  const onSubmit = async (data: any) => {
    try {
      const hostId = auth.currentUser?.uid!;
      const hostName = `${userData?.fname} ${userData?.lname}`;
      const status = "unpublish";

      // Combine the state and any other data needed
      const eventDataToSubmit = {
        ...eventData,
        ...data,
        // ...register,
        host_id: hostId,
        host_name: hostName,
        status: status,
        isArchived: false,
      };
      console.log(id);

      // Call the createEvent function to add the event data to Firebase
      await createEvent(eventDataToSubmit);

      // const docRef = doc(db, `venues`, id);
      // const colRef = collection(docRef, "events");
      // await addDoc(colRef, eventDataToSubmit);

      // Optionally, you can reset the form after successful submission
      reset();

      // Log success or navigate to another page
      console.log("Event created successfully!");
    } catch (error) {
      console.log("Error creating event:", error);
    }
  };

  return (
    <IonCard className="hhome-card-container">
      {/* <IonLabel className="hhome-form-label">
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
      </IonLabel> */}
      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Upload your poster:</span>
        {imagePreviewUrl && (
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className="hhome-image-preview"
          />
        )}
        <IonButton onClick={handleCameera}>Upload Photo</IonButton>
      </IonLabel>

      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Event Title:</span>
        <IonInput
          className="hhome-form-input"
          type="text"
          required
          {...register("title")}
        />
      </IonLabel>

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
          {...register("description")}
        />
      </IonLabel>

      {/* <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Venue Format:</span>
        <IonSelect
          interfaceOptions={customVenueFormatOptions}
          interface="alert"
          placeholder="Select venue type"
          value={venue}
          {...register("venueType")}
          onIonChange={handleVenueChange}
        >
          <IonSelectOption value="online">Online</IonSelectOption>
          <IonSelectOption value="on-site">On Site</IonSelectOption>
        </IonSelect>
      </IonLabel>

      {additionalVenueOptions && (
        <IonLabel className="hhome-form-label">
          <span className="hhome-form-title">Choose a venue:</span>
          <IonSelect
            placeholder="Select One"
            interfaceOptions={customVenueOptions}
            {...register("venue")}
          >
            <IonSelectOption value="smx-olongapo">SMX Olongapo</IonSelectOption>
            <IonSelectOption value="travelers-hotel">
              Travelers Hotel
            </IonSelectOption>
          </IonSelect>
        </IonLabel>
      )}

      {additionalOnlineOptions && (
        <IonLabel className="hhome-form-label">
          <span className="hhome-form-title">Choose a platform:</span>
          <IonSelect
            placeholder="Select One"
            onIonChange={handleOnlineOptionChange}
            interfaceOptions={customVenuePlatformOptions}
            {...register("venue")}
          >
            <IonSelectOption value="zoom">Zoom</IonSelectOption>
            <IonSelectOption value="google-meet">Google Meet</IonSelectOption>
            <IonSelectOption value="ms-teams">MS Teams</IonSelectOption>
          </IonSelect>
        </IonLabel>
      )} */}

      <div className="date-time-row">
        <div className="date-time-item">
          <IonLabel className="hhome-form-label date-time-label">
            <span className="hhome-form-title">Event Date:</span>
            <div className="date-time-container">
              <IonDatetimeButton datetime="date"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  {...register("eventDate")}
                  showDefaultButtons={true}
                  presentation="date"
                  id="date"
                  min="2023-12-01"
                  max="2025-12-31"
                ></IonDatetime>
              </IonModal>
            </div>
          </IonLabel>
        </div>

        <div className="date-time-item">
          <IonLabel className="hhome-form-label date-time-label">
            <span className="hhome-form-title">Start Time:</span>
            <div className="date-time-container">
              <IonDatetimeButton datetime="start"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  {...register("startTime")}
                  showDefaultButtons={true}
                  presentation="time"
                  id="start"
                  max="23:00"
                  min="00:00"
                ></IonDatetime>
              </IonModal>
            </div>
          </IonLabel>
        </div>

        <div className="date-time-item">
          <IonLabel className="hhome-form-label date-time-label">
            <span className="hhome-form-title">End Time:</span>
            <div className="date-time-container">
              <IonDatetimeButton datetime="end"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  {...register("endTime")}
                  showDefaultButtons={true}
                  presentation="time"
                  id="end"
                  max="23:00"
                  min="00:00"
                ></IonDatetime>
              </IonModal>
            </div>
          </IonLabel>
        </div>
      </div>

      <IonButton
        type="submit"
        expand="full"
        fill="clear"
        onClick={handleSubmit(onSubmit)}
        className="hsubmit-btn"
      >
        <span className="hsubmit-txt">Submit</span>
      </IonButton>
    </IonCard>
  );
}

export default CreateEvent;

import {
  IonCard,
  IonLabel,
  IonInput,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonButton,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonToggle,
  IonImg,
} from "@ionic/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
import useHandleEvents from "../../hooks/useHandleEvents";
import DefaultImg from "../../assets/defaultCover.jpg";

// type RouteParams = {
//   id: string;
// };

function CreateEvent() {
  // const { id } = useParams<RouteParams>();
  // const { data: venueData } = useQuery("venue", "id", "==", id);
  const { userData } = useFirebaseAuth();
  // const { addData: createEvent } = useFirestore(`venues/${id}/events`);

  const { handleCreateEvent, setIsPaid, setImgUrl } = useHandleEvents();
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
  // const [isPaid, setIsPaid] = useState(false);
  // const [imagePreviewUrl, setImagePreviewUrl] = useState<File | null>(null);
  // const [imgUrl, setImgUrl] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // const handleInputChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setEventData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

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

  // console.log("Photot: ", photos);

  function MinDate() {
    // Calculate the date 18 years ago from today
    const today = new Date();
    const minDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split("T")[0]; // Format as 'YYYY-MM-DD'

    return minDate;
  }
  function MaxDate() {
    // Calculate the date 18 years ago from today
    const today = new Date();
    const maxDate = new Date(
      today.getFullYear() + 1,
      today.getMonth() - 5,
      today.getDate()
    )
      .toISOString()
      .split("T")[0]; // Format as 'YYYY-MM-DD'

    return maxDate;
  }
  console.log(MinDate());

  const handleImageClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <IonCard className="hhome-card-container">
      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Upload your poster:</span>
        <input
          hidden
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          // className="hhome-form-input-file"
        />
        {/* {imagePreviewUrl && ( */}
        <IonImg
          onClick={handleImageClick}
          src={imagePreviewUrl || DefaultImg}
          alt="Preview"
          className="hhome-image-preview"
        />
        {/* )} */}
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
        <IonTextarea
          maxlength={100}
          className="hhome-form-input"
          // type="text"
          required
          {...register("title", { required: true })}
        />
      </IonLabel>
      {formError.title?.type === "required" && (
        <p role="alert" className="text-color-danger">
          Please add a title
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
          Please add a Description
        </p>
      )}
      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Tags:</span>
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
          {...register("keywords", { required: true })}
        />
      </IonLabel>
      {/* {formError.keywords?.type === "required" && (
        <p role="alert" className="text-color-danger">
          Please add a Description
        </p>
      )} */}

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
                  min={MinDate()}
                  max={MaxDate()}
                ></IonDatetime>
              </IonModal>
            </div>
          </IonLabel>
          {formError.eventDate?.type === "required" && (
            <p role="alert" className="text-color-danger">
              Please add the date in which the event will take place
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
              Please add the time in which the event will start
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
              Please select the time in which the event will end
            </p>
          )}

          {/* {formError.event_fee?.type === "required" && (
            <p role="alert" className="text-color-danger">
              Please add amount fee
            </p>
          )} */}
        </div>
      </div>
      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Number of Deligates:</span>
        <IonInput
          className="hhome-form-input"
          type="number"
          required
          min={20}
          {...register("event_deligates", { required: true })}
        />
      </IonLabel>
      {formError.event_deligates?.type === "required" && (
        <p role="alert" className="text-color-danger">
          Please type value in this field(minimum of twety deligates)
        </p>
      )}

      {/* <IonLabel className="hhome-form-label">
        <IonSelect
          interface="popover"
          label="Event Fee"
          className="hhome-form-input"
          onIonChange={(e) => setIsPaid(e.detail.value)}
        >
          <IonSelectOption value={false}>Free</IonSelectOption>
          <IonSelectOption value={true}>Paid</IonSelectOption>
        </IonSelect>
      </IonLabel> */}

      {/* <IonItem lines="none" className="item-bg-none"> */}
      <IonLabel>
        <span className="hhome-form-title">is there any fee?</span>
        <IonToggle
          // slot="end"
          color={"primary"}
          enableOnOffLabels={true}
          onIonChange={(e) => {
            e.detail.checked ? setIsPaid(true) : setIsPaid(false);
          }}
        ></IonToggle>
      </IonLabel>

      {/* </IonItem> */}

      <IonButton
        type="submit"
        expand="full"
        shape="round"
        // fill="clear"
        // onClick={handleSubmit(onSubmit)}
        onClick={handleSubmit(handleCreateEvent)}
        // className="hsubmit-btn"
        className="ion-margin-top"
        disabled={!imagePreviewUrl || !formError}
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

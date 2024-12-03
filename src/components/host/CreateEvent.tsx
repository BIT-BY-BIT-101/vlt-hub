import {
  IonCard,
  IonLabel,
  IonImg,
  IonTextarea,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonInput,
  IonToggle,
  IonButton,
  IonItem,
} from "@ionic/react";
import { useContext, useState, useRef, useEffect, ChangeEvent } from "react";
import { render } from "@react-email/render";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import CourseCreationEmail from "../../emails/CourseCreationEmail";
import { formatDateString } from "../../helpers/DateTimeFunctions";
import useHandleEvents from "../../hooks/useHandleEvents";
import DefaultImg from "../../assets/defaultCover.jpg";
import EventImageCropper from "../modals/EventImageCropper";
import { defaultImg } from "../../helpers/Helpers";

// type RouteParams = {
//   id: string;
// };

function CreateEvent() {
  // const { id } = useParams<RouteParams>();
  // const { data: venueData } = useQuery("venue", "id", "==", id);
  // const { userData } = useFirebaseAuth();
  // const { addData: createEvent } = useFirestore(`venues/${id}/events`);

  const { currentUser } = useContext(AuthContext);

  // const userData = currentUser?.data;

  const { handleCreateEvent, setIsPaid, setImgUrl, setEmailMessage } =
    useHandleEvents();
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    host_id: "",
    host_name: "",
    event_date: "",
    venueType: "On-site",
    venue_Id: "",
    venue: "",
    platform: "",
    start_time: "",
    end_time: "",
    date_from: "",
    date_to: "",
    ingress_date: "",
    egress_date: "",
    keywords: "",
    number_of_attendees: "",
  });
  // const [eventDate, setEventDate] = useState<string>("");
  // const [venue, setVenue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [additionalVenueOptions, setAdditionalVenueOptions] = useState(false);
  // const [additionalOnlineOptions, setAdditionalOnlineOptions] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>();

  // const [eventTitleValue, setEventTitleValue] = useState("");
  // const [eventDateValue, setEventDateValue] = useState();

  const [image, setImage] = useState<any>(defaultImg);
  const [cropperModal, setCropperModal] = useState(false);
  const [croppedBase64, setCroppedBase64] = useState<string | null>(null);

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

  const handleChange = (event: CustomEvent) => {
    const { name, value } = event.target as HTMLIonInputElement;
    setEventData((prevData) => ({
      ...prevData,
      [name]:
        name === "date_from" && "date_to" && "ingress_date" && "egress_date"
          ? value?.toString()
          : value,
    }));
  };

  useEffect(() => {
    const name = currentUser?.data?.fname;

    const appUrl = import.meta.env.VITE_APP_URL;
    async function getTemplate() {
      const emailTemplate = await render(
        <CourseCreationEmail
          appUrl={appUrl}
          name={name}
          event_title={eventData?.title}
          event_date={formatDateString(eventData?.date_from)}
        />,
        {
          pretty: true,
        }
      );
      setEmailMessage(emailTemplate);
    }
    getTemplate();
  }, [eventData]);

  useEffect(() => {
    console.log(formError);
  }, [formError]);

  console.table(eventData);
  console.log(eventData.title);
  console.log(eventData.date_from);

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   setSelectedFile(file || null);

  //   if (file) {
  //     const img = file;
  //     const imageUrl = URL.createObjectURL(file);
  //     console.log("image: ", img);
  //     console.log("url: ", imageUrl);
  //     setImgUrl(img);
  //     setImagePreviewUrl(imageUrl);
  //   } else {
  //     setImagePreviewUrl(null);
  //     setImgUrl(null);
  //   }
  // };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result as string;
        console.log("Base64 Image: ", base64Image);
        // setImgUrl(file); // Keep the original file if needed for uploading
        setImage(base64Image); // Set the Base64 image for the cropper
        setCropperModal(true); // Trigger the cropper modal
      };

      reader.readAsDataURL(file); // Convert file to Base64
    } else {
      setImagePreviewUrl(null);
      setImgUrl(null);
    }
  };

  // const handleVenueChange = (event: CustomEvent) => {
  //   const selectedVenue = event.detail.value;
  //   setVenue(selectedVenue);

  //   setAdditionalVenueOptions(selectedVenue === "on-site");

  //   setAdditionalOnlineOptions(selectedVenue === "online");
  // };

  // const handleOnlineOptionChange = (event: CustomEvent) => {
  //   const selectedOnlineOption = event.detail.value;
  //   console.log("Selected Online Option:", selectedOnlineOption);
  // };

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

  const handleImageClick = () => {
    fileInputRef?.current?.click();
  };

  function handleCloseCropperModal() {
    setImage(undefined);
    setCropperModal(false);
  }

  async function onSaveCroppedImage(croppedBase64Image: string) {
    if (croppedBase64Image) {
      const blob = await (await fetch(croppedBase64Image)).blob(); // Convert Base64 to Blob
      setImgUrl(blob);
      console.log(blob);
    }
    setCroppedBase64(croppedBase64Image); // Save the cropped image in Base64 format
    setImagePreviewUrl(croppedBase64Image);
    // setImgUrl(croppedBase64Image);
    setCropperModal(false); // Close the cropper modal
  }

  function onCancel() {
    setImgUrl(null);
    setImagePreviewUrl(null);
    setCroppedBase64(null);
  }

  return (
    <IonCard className="hhome-card-container">
      <EventImageCropper
        imageSrc={image}
        open={cropperModal}
        onDidDismissal={handleCloseCropperModal}
        onSaveCroppedImage={onSaveCroppedImage}
        onCancel={onCancel}
      />
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

      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Event Title:</span>
        <IonTextarea
          maxlength={100}
          className="hhome-form-input"
          onIonChange={handleChange}
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
        <span className="hhome-form-title">Description:</span>
        {/* <IonInput
          className="hhome-form-input"
          type="text"
          required
          {...register("description")}
          /> */}
        <IonTextarea
          className="hhome-form-input"
          autoGrow={true}
          onIonChange={handleChange}
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
            <span className="hhome-form-title">Ingress Date:</span>
            <div className="date-time-container">
              <IonDatetimeButton datetime="ingress_date"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  // {...register("ingress_date", { required: true })}
                  // onIonChange={(e) => setEventDate(e.detail.value)}
                  onIonChange={handleChange}
                  showDefaultButtons={true}
                  presentation="date"
                  name="ingress_date"
                  id="ingress_date"
                  min={MinDate()}
                  max={MaxDate()}
                ></IonDatetime>
              </IonModal>
            </div>
          </IonLabel>
          {/* {formError.ingress_date?.type === "required" && (
            <p role="alert">This Field is required</p>
          )} */}
        </div>
        <div className="date-time-item">
          <IonLabel className="hhome-form-label date-time-label">
            <span className="hhome-form-title">Egress Date:</span>
            <div className="date-time-container">
              <IonDatetimeButton datetime="egress_date"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  // {...register("egress_date", { required: true })}
                  // onIonChange={(e) => setEventDate(e.detail.value)}
                  onIonChange={handleChange}
                  showDefaultButtons={true}
                  presentation="date"
                  name="egress_date"
                  id="egress_date"
                  min={MinDate()}
                  max={MaxDate()}
                ></IonDatetime>
              </IonModal>
            </div>
          </IonLabel>
          {/* {formError.egress_date?.type === "required" && (
            <p role="alert">This Field is required</p>
          )} */}
        </div>
      </div>
      <div className="date-time-row">
        <div className="date-time-item">
          <IonLabel className="hhome-form-label date-time-label">
            <span className="hhome-form-title">Date From:</span>
            <div className="date-time-container">
              <IonDatetimeButton datetime="date_from"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  // {...register("date_from", { required: true })}
                  // onIonChange={(e) => setEventDate(e.detail.value)}
                  onIonChange={handleChange}
                  showDefaultButtons={true}
                  presentation="date"
                  name="date_from"
                  id="date_from"
                  min={MinDate()}
                  max={MaxDate()}
                ></IonDatetime>
              </IonModal>
            </div>
          </IonLabel>
          {/* {formError.date_from?.type === "required" && (
            <p role="alert">This Field is required</p>
          )} */}
        </div>
        <div className="date-time-item">
          <IonLabel className="hhome-form-label date-time-label">
            <span className="hhome-form-title">Date To:</span>
            <div className="date-time-container">
              <IonDatetimeButton datetime="date_to"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  // {...register("date_to", { required: true })}
                  // onIonChange={(e) => setEventDate(e.detail.value)}
                  onIonChange={handleChange}
                  showDefaultButtons={true}
                  presentation="date"
                  name="date_to"
                  id="date_to"
                  min={MinDate()}
                  max={MaxDate()}
                ></IonDatetime>
              </IonModal>
            </div>
          </IonLabel>
          {/* {formError.date_to?.type === "required" && (
            <p role="alert">This Field is required</p>
          )} */}
        </div>
      </div>
      <div className="date-time-row">
        <div className="date-time-item">
          <IonLabel className="hhome-form-label date-time-label">
            <span className="hhome-form-title">Start Time:</span>
            <div className="date-time-container">
              <IonDatetimeButton datetime="start"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  {...register("start_time", { required: true })}
                  // onIonChange={(e) => setEventDate(e.detail.value)}
                  onIonChange={handleChange}
                  name="start_time"
                  showDefaultButtons={true}
                  presentation="time"
                  id="start"
                  min="2023-12-01"
                  max="2025-12-31"
                ></IonDatetime>
              </IonModal>
            </div>
          </IonLabel>
          {formError.start_time?.type === "required" && (
            <p role="alert">This Field is required</p>
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
                  onIonChange={handleChange}
                  name="end_time"
                  showDefaultButtons={true}
                  presentation="time"
                  id="end"
                  min="2023-12-01"
                  max="2025-12-31"
                ></IonDatetime>
              </IonModal>
            </div>
          </IonLabel>
          {formError.end_time?.type === "required" && (
            <p role="alert">This Field is required</p>
          )}
        </div>
      </div>
      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Number of Attendees:</span>
        <IonInput
          className="hhome-form-input"
          type="number"
          required
          min={20}
          onIonChange={handleChange}
          {...register("number_of_attendees", { required: true })}
        />
      </IonLabel>
      {formError.number_of_attendees?.type === "required" && (
        <p role="alert" className="text-color-danger">
          Please type value in this field(minimum of 20 deligates)
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

      {/* {formError && (
        <IonItem color={"danger"} style={{ marginTop: "10px" }}>
          <p role="alert" className="text-color-danger">
            Please don't leave any field empty
          </p>
        </IonItem>
      )} */}

      <IonButton
        type="submit"
        expand="full"
        shape="round"
        // fill="clear"
        // onClick={handleSubmit(onSubmit)}
        onClick={handleSubmit(() => {
          handleCreateEvent(eventData);
        })}
        // className="hsubmit-btn"
        className="ion-margin-top"
        // disabled={!imagePreviewUrl || !formError}
      >
        <span className="hsubmit-txt">Submit</span>
      </IonButton>
    </IonCard>
  );
}

export default CreateEvent;

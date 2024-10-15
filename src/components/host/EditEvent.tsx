import {
  IonCard,
  IonLabel,
  IonTextarea,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonInput,
  IonToggle,
  IonButton,
  useIonViewDidEnter,
  IonImg,
} from "@ionic/react";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { EventDataModel } from "../../models/Model";
import { arrayRemove, arrayUnion, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import { auth } from "../../config/firebase";
import {
  arrayToString,
  handleWindowRoute,
  keywordsToArray,
} from "../../helpers/Helpers";
import useFirestore from "../../hooks/useFirestore";
import { useHistory, useParams } from "react-router";
import useGetEvent from "../../hooks/useGetEvent";
import { UpdateDataContext } from "../../context/UpdateDataContext";
import DefaultImg from "../../assets/defaultCover.jpg";

type RouteParams = {
  id: string;
};

const EditEvent = () => {
  // const { data: eventDetails } = useContext(UpdateDataContext);
  const { id } = useParams<RouteParams>();
  const { data: eventDetails, error, loading } = useGetEvent(id!);
  const [editedData, setEditedData] = useState<EventDataModel | null>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<File | null>(null);
  const history = useHistory();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { updateData: updateEvent, error: updateError } =
    useFirestore("events");

  const currentKeywords = eventDetails?.keywords;
  // const currentKeywordString = arrayToString(currentKeywords);
  console.log("keywords: ", currentKeywords);
  // console.log("keywords string: ", currentKeywordString);

  console.log("Details: ", eventDetails);

  // console.log(currentKeywords);

  useEffect(() => {
    if (eventDetails) {
      setEditedData(eventDetails);
    }
  }, [eventDetails]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to save?",
      showCancelButton: true,
      confirmButtonText: "Save",
      heightAuto: false,
    }).then(async (result) => {
      console.log(editedData);

      if (result.isConfirmed) {
        // Show loading until the upload completes
        Swal.fire({
          heightAuto: false,
          position: "top-right",
          title: "Uploading..",
          didOpen: () => {
            Swal.showLoading(); // Keep loading animation active
          },
        });

        try {
          // First async task: remove current keywords
          await updateEvent(id!, {
            keywords: arrayRemove({ currentKeywords }),
          });

          console.log("tags removed successfully");

          console.log("keywords: ", editedData?.keywords);

          // Prepare new keywords
          const newKeywords = editedData?.keywords;
          console.log("newKeywords: ", newKeywords);

          // Second async task: update the event with new data
          await updateEvent(
            id!,
            {
              ...editedData,
              keywords: newKeywords,
              updatedAt: serverTimestamp(),
            },
            () => {
              Swal.fire({
                heightAuto: false,
                icon: "success",
                title: "Successfully added!",
              }).then(() => {
                // Redirect to event details
                history.push({
                  pathname: `/host/event/details/${id}`,
                  state: { updatedEvent: editedData }, // Passing updated data
                });
              });
            }
          );

          // Show success message
        } catch (error) {
          console.error("Error: ", error);

          // Show error message if something goes wrong
          Swal.fire({
            heightAuto: false,
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };

  const handleInputChange = (e: CustomEvent) => {
    const { name, value } = e.target;

    setEditedData((prevData: any) => ({
      ...prevData,
      [name]: name === "keywords" ? keywordsToArray(value) : value,
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

  const handleImageClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <>
      <IonCard className="hhome-card-container">
        <IonLabel className="hhome-form-label">
          <span className="hhome-form-title">Upload your poster:</span>
          <input
            hidden
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            // className="hhome-form-input-file"
          />
          {/* {imagePreviewUrl && ( */}
          <IonImg
            onClick={handleImageClick}
            src={
              editedData?.imageUrl
                ? imagePreviewUrl || editedData?.imageUrl
                : DefaultImg || imagePreviewUrl
            }
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
            value={editedData?.title || ""}
            name="title"
            required
            onIonChange={handleInputChange}
          />
        </IonLabel>

        <IonLabel className="hhome-form-label">
          <span className="hhome-form-title">Add a description:</span>

          <IonTextarea
            className="hhome-form-input"
            autoGrow={true}
            required
            value={editedData?.description || ""}
            name="description"
            onIonChange={handleInputChange}
          />
        </IonLabel>

        <IonLabel className="hhome-form-label">
          <span className="hhome-form-title">Tags:</span>

          <IonTextarea
            className="hhome-form-input"
            autoGrow={true}
            required
            value={arrayToString(editedData?.keywords) || " "}
            name="keywords"
            onIonChange={handleInputChange}
          />
        </IonLabel>

        <IonButton
          type="submit"
          expand="full"
          shape="round"
          // fill="clear"
          // onClick={handleSubmit(onSubmit)}
          onClick={handleSubmit}
          // className="hsubmit-btn"
          className="ion-margin-top"
          // disabled={!imagePreviewUrl}
        >
          <span className="hsubmit-txt">Update</span>
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
    </>
  );
};

export default EditEvent;

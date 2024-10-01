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
} from "@ionic/react";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { EventDataModel } from "../../models/Model";
import { arrayRemove, arrayUnion, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import { auth } from "../../config/firebase";
import { arrayToString, handleWindowRoute } from "../../helpers/Helpers";
import useFirestore from "../../hooks/useFirestore";
import { useParams } from "react-router";
import useGetEvent from "../../hooks/useGetEvent";
import { UpdateDataContext } from "../../context/UpdateDataContext";

type RouteParams = {
  id: string;
};

const EditEvent = () => {
  const { data: EventDetails } = useContext(UpdateDataContext);
  const { id } = useParams<RouteParams>();
  const { data: EventDetails } = useGetEvent(id!);
  const [editedData, setEditedData] = useState<EventDataModel>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<File | null>(null);

  const { updateData: updateEvent, error: updateError } =
    useFirestore("events");

  const keywordsData = EventDetails?.keywords;
  // console.log(keywordsData);

  useEffect(() => {
    setEditedData(EventDetails);
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Do you want to save?",
        showCancelButton: true,
        confirmButtonText: "Save",
        heightAuto: false,
      }).then(async (result) => {
        console.log(editedData);

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
          })
            .then(async () => {
              // Combine the state and any other data needed

              // Call the createEvent function to add the event data to Firebase

              await updateEvent(id!, {
                keywords: arrayRemove({ ...keywordsData }),
              }).then(() => {
                const newKeywords = arrayToString(editedData?.keywords);
                updateEvent(id!, {
                  ...editedData,
                  keywords: arrayUnion({ newKeywords }),
                  updatedAt: serverTimestamp(),
                });
              });

              // Optionally, you can reset the form after successful submission
              // reset();

              // Log success or navigate to another page
              console.log("Venue Added successfully!");
            })
            .then(() => {
              Swal.fire({
                heightAuto: false,
                icon: "success",
                title: "Successfully added!",
              }).then(() => {
                handleWindowRoute("/venue/profile");
              });
            });
        }
      });
    } catch (err) {
      console.log("Error adding venue:", err);
      Swal.fire({
        heightAuto: false,
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleInputChange = (e: CustomEvent) => {
    setEditedData((prevData: any) => () => ({
      ...prevData,
      [e.target?.name]: e.target.value,
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

  return (
    <>
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
            value={arrayToString(editedData?.keywords) || ""}
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

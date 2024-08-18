import {
  IonButton,
  IonCard,
  IonDatetime,
  IonDatetimeButton,
  IonInput,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import React, { ChangeEvent, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../config/firebase";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import useFirestore from "../../hooks/useFirestore";
import "./AddVenue.css";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { handleWindowRoute } from "../../helpers/Helpers";

const AddVenue = () => {
  const { currentUser } = useContext(AuthContext);
  const { userData } = useFirebaseAuth();
  const { addData: addVenue, error: addError } = useFirestore("venues");
  const { updateData: updateProfile, error: updateError } =
    useFirestore("profiles");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm();
  const [venueData, setvenueData] = useState({
    name: "",
    description: "",
    user_id: "",
    venue_manager: "",
    imgUrl: "",
    // address
    bldg_no: "",
    street: "",
    baranggay: "",
    city: "",
    maxCapacity: 0,
  });

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

  const onSubmit = async (data: any) => {
    try {
      Swal.fire({
        title: "Do you want to save?",
        showCancelButton: true,
        confirmButtonText: "Save",
        heightAuto: false,
      }).then(async (result) => {
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
              const userId = auth.currentUser?.uid!;
              const userName = `${userData?.fname} ${userData?.lname}`;

              // Combine the state and any other data needed
              const venueDataToSubmit = {
                ...venueData,
                ...data,
                // ...register,
                user_id: userId,
                venue_manager: userName,
              };

              // Call the createEvent function to add the event data to Firebase
              await addVenue(venueDataToSubmit)
                .then(async (res) => {
                  if (updateError === null) {
                    await updateProfile(currentUser?.uid!, {
                      venueId: res,
                    });
                  } else {
                    Swal.fire({
                      heightAuto: false,
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong, please try again.",
                    });
                  }
                })
                .catch((err) => {
                  Swal.fire({
                    heightAuto: false,
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong, please try again.",
                  });
                });

              // Optionally, you can reset the form after successful submission
              reset();

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
    }
  };
  return (
    <IonCard className="addvenue-card-container">
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
        <span className="hhome-form-title">Name of the Venue:</span>
        <IonInput
          className="hhome-form-input"
          type="text"
          required
          {...register("name")}
        />
      </IonLabel>

      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Add a description:</span>
        <IonTextarea
          className="hhome-form-input"
          autoGrow={true}
          required
          {...register("description")}
        />
      </IonLabel>

      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Bldg/Floor/Block Number</span>
        <IonInput
          className="hhome-form-input"
          type="text"
          // inputMode="numeric"
          // pattern="[0-9]"
          placeholder="e.g., 1A, 234, etc."
          required
          {...register("bldg_no")}
        />
      </IonLabel>
      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Street</span>
        <IonInput
          className="hhome-form-input"
          type="text"
          required
          {...register("street")}
        />
      </IonLabel>
      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Baranggay</span>
        <IonInput
          className="hhome-form-input"
          type="text"
          required
          {...register("baranggay")}
        />
      </IonLabel>
      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">City</span>
        <IonInput
          className="hhome-form-input"
          type="text"
          required
          {...register("city")}
        />
      </IonLabel>
      {/* <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Maximum Capacity</span>
        <IonInput
          className="hhome-form-input"
          type="number"
          required
          {...register("maxCapacity")}
        />
      </IonLabel> */}

      <IonButton
        type="submit"
        expand="full"
        fill="clear"
        onClick={handleSubmit(onSubmit)}
        className="addevent-submit-btn"
      >
        <span className="hsubmit-txt">Submit</span>
      </IonButton>
    </IonCard>
  );
};

export default AddVenue;

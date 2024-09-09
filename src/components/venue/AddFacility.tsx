import {
  IonCard,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/react";
import React, { ChangeEvent, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { auth } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { handleWindowRoute } from "../../helpers/Helpers";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import useFirestore from "../../hooks/useFirestore";

const AddFacility = () => {
  const { currentUser } = useContext(AuthContext);
  const { userData } = useFirebaseAuth();
  const { addData: addRoom, error: addError } = useFirestore("facilities");

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formError },
  } = useForm();
  const [venueData, setvenueData] = useState({
    name: "",
    description: "",
    userId: "",
    venueId: "",
    imgUrl: "",
    maxCapacity: 0,
  });

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   setSelectedFile(file || null);

  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setImagePreviewUrl(imageUrl);
  //   } else {
  //     setImagePreviewUrl(null);
  //   }
  // };

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
              const venueId = currentUser?.data.venueId;
              const userName = `${userData?.fname} ${userData?.lname}`;

              // Combine the state and any other data needed
              const venueDataToSubmit = {
                ...venueData,
                ...data,
                // ...register,
                userId: userId,
                venueId: venueId,
                venue_manager: userName,
              };

              // Call the createEvent function to add the event data to Firebase
              await addRoom(venueDataToSubmit);

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
                handleWindowRoute("/venue/list-venue");
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
  return (
    <IonCard className="card">
      <IonLabel className="card-label">
        <span className="form-title">Name of the Venue:</span>
        <IonInput
          className="form-input"
          type="text"
          required
          {...register("name", { required: true })}
        />
      </IonLabel>
      {formError.name?.type === "required" && (
        <p role="alert" className="text-color-danger">
          This is a required field
        </p>
      )}

      {/* <IonLabel className="card-label">
        <span className="form-title">Add a description:</span>
        <IonTextarea
          className="hhome-form-input"
          autoGrow={true}
          required
          {...register("description", { required: true })}
        />
      </IonLabel>
      {formError.description?.type === "required" && (
        <p role="alert" className="text-color-danger">
          This is a required field
        </p>
      )} */}

      <IonLabel className="card-label">
        <span className="form-title">Maximum Capacity</span>
        <IonInput
          className="form-input"
          type="number"
          required
          {...register("maxCapacity")}
        />
      </IonLabel>
      {formError.name?.type === "required" && (
        <p role="alert" className="text-color-danger">
          This is a required field
        </p>
      )}

      <IonButton
        type="submit"
        expand="block"
        // fill="clear"
        // shape="round"
        onClick={handleSubmit(onSubmit)}
        // className="addevent-submit-btn"
      >
        <span className="hsubmit-txt">Submit</span>
      </IonButton>
    </IonCard>
  );
};

export default AddFacility;

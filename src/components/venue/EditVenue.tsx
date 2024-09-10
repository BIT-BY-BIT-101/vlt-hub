import {
  IonCard,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/react";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { auth } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { handleWindowRoute } from "../../helpers/Helpers";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import useFirestore from "../../hooks/useFirestore";
import { serverTimestamp } from "@firebase/firestore";
import useFetchVenueDetails from "../../hooks/useFetchVenueDetails";
import { VenueDataModel } from "../../models/Model";

const EditVenue = () => {
  const { currentUser } = useContext(AuthContext);
  const { data: venueDetails } = useFetchVenueDetails();
  const { userData } = useFirebaseAuth();
  const { updateData: updateProfile, error: updateError } =
    useFirestore("venues");
  const [editedData, setEditedData] = useState<VenueDataModel>();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  // const { register, handleSubmit, reset } = useForm();
  const [venueData, setvenueData] = useState({});

  useEffect(() => {
    setEditedData(venueDetails);
  }, []);
  console.log(editedData);

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
              const userId = auth.currentUser?.uid!;
              const userName = `${userData?.fname} ${userData?.lname}`;

              // Combine the state and any other data needed

              // Call the createEvent function to add the event data to Firebase

              await updateProfile(currentUser?.data.venueId!, {
                ...editedData,
                updatedAt: serverTimestamp(),
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
    setEditedData((prevData: any) => ({
      ...editedData,
      [e.target?.name]: e.target.value,
    }));
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
          name="name"
          value={editedData?.name || ""}
          // {...register("name")}
          // onIonChange={(e) =>
          //   setEditedData((prevData: any) => ({
          //     ...prevData,
          //     name: e.detail.value!,
          //   }))
          // }

          onIonChange={handleInputChange}
        />
      </IonLabel>

      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Add a description:</span>
        <IonTextarea
          className="hhome-form-input"
          autoGrow={true}
          required
          name="description"
          value={editedData?.description}
          // {...register("description")}
          // onIonChange={(e) =>
          //   setEditedData((prevData: any) => ({
          //     ...prevData,
          //     description: e.detail.value!,
          //   }))
          // }
          onIonChange={handleInputChange}
        />
      </IonLabel>

      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Bldg/Floor/Block Number</span>
        <IonInput
          className="hhome-form-input"
          type="text"
          // inputMode="numeric"
          // pattern="[0-9]"
          // placeholder={venueDetails?.bldg_no}
          name="bldg_no"
          value={editedData?.bldg_no}
          required
          // {...register("bldg_no")}
          // onIonChange={(e) =>
          //   setEditedData((prevData: any) => ({
          //     ...prevData,
          //     bldg_no: e.detail.value!,
          //   }))
          // }
          onIonChange={handleInputChange}
        />
      </IonLabel>
      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Street</span>
        <IonInput
          className="hhome-form-input"
          type="text"
          required
          name="street"
          value={editedData?.street}
          // placeholder={venueDetails?.street}
          // {...register("street")}
          // onIonChange={(e) =>
          //   setEditedData((prevData: any) => ({
          //     ...prevData,
          //     street: e.detail.value!,
          //   }))
          // }
          onIonChange={handleInputChange}
        />
      </IonLabel>
      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">Baranggay</span>
        <IonInput
          className="hhome-form-input"
          type="text"
          required
          name="baranggay"
          value={editedData?.baranggay}
          // {...register("baranggay")}
          // onIonChange={(e) =>
          //   setEditedData((prevData: any) => ({
          //     ...prevData,
          //     baranggay: e.detail.value!,
          //   }))
          // }
          onIonChange={handleInputChange}
        />
      </IonLabel>
      <IonLabel className="hhome-form-label">
        <span className="hhome-form-title">City</span>
        <IonInput
          className="hhome-form-input"
          type="text"
          required
          name="city"
          value={editedData?.city}
          // {...register("city")}
          // onIonChange={(e) =>
          //   setEditedData((prevData: any) => ({
          //     ...prevData,
          //     city: e.detail.value!,
          //   }))
          // }
          onIonChange={handleInputChange}
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
        onClick={handleSubmit}
        className="addevent-submit-btn"
      >
        <span className="hsubmit-txt">Submit</span>
      </IonButton>
    </IonCard>
  );
};

export default EditVenue;

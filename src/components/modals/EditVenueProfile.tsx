import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { doc, updateDoc } from "firebase/firestore";
import { closeCircle } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { db } from "../../config/firebase";
import useFirestore from "../../hooks/useFirestore";
import "./EditVenueProfile.css";

interface VenueData {
  fname: string;
  bio: string;
  lname: string;
  age: string;
  gender: string;
  bldg_no: string;
  street: string;
  city: string;
  country: string;
}

type EditProps = {
  userData: any;
  isOpen: boolean;
  onClose: () => void;
};

const EditVenueProfile: React.FC<EditProps> = ({
  userData,
  isOpen,
  onClose,
}) => {
  const { updateData } = useFirestore("profiles");
  const [editedData, setEditedData] = useState<any>({ ...userData });
  const history = useHistory();

  const handleSaveChanges = async () => {
    try {
      const userEmail = localStorage.getItem("session")!;

      if (userEmail) {
        await updateData(userEmail, editedData);

        console.log(editedData);
        console.log(userData);
        onClose();

        history.push("/venue/home");
      }
    } catch (error) {
      console.log(error);
      console.error;
    }
  };

  // const handleSaveChanges = async () => {
  //   try {
  //     // Update user data in Firestore
  //     const userEmail = localStorage.getItem("session");
  //     if (userEmail) {
  //       const userDocRef = doc(db, "profiles", userEmail);
  //       await updateDoc(userDocRef, editedData);
  //       console.log("Profile updated successfully!");
  //       onClose();

  //       window.location.reload();

  //       // fetchUserData();
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };

  return (
    <>
      <IonModal isOpen={isOpen} className="veditprofile-modal">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Profile</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onClose}>
                <IonIcon icon={closeCircle} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="veditprofile-modal-content">
          {/* {profilePicture && (
            <IonImg id="profile-image" src={profilePicture} alt="Profile" />
          )} */}
          {/* ... (other input fields) */}
          {/* <IonButton onClick={handleCapturePicture}>Capture Picture</IonButton> */}
          {/* <IonItem>
            {userData?.fname} {userData?.lname}
          </IonItem> */}

          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">Name:</span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData?.fname}
              onIonChange={(e) =>
                setEditedData((prevData: any) => ({
                  ...prevData,
                  fname: e.detail.value!,
                }))
              }
            />
          </IonLabel>
          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">Last Name:</span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData?.lname}
              onIonChange={(e) =>
                setEditedData((prevData: any) => ({
                  ...prevData,
                  lname: e.detail.value!,
                }))
              }
            />
          </IonLabel>

          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">Gender:</span>
            <IonSelect
              className="veditprofile-form-select"
              interface="action-sheet"
              placeholder="Select Gender"
              onIonChange={(e) =>
                setEditedData((prevData: any) => ({
                  ...prevData,
                  gender: e.detail.value!,
                }))
              }
            >
              <IonSelectOption value="Male">Male</IonSelectOption>
              <IonSelectOption value="Female">Female</IonSelectOption>
            </IonSelect>
          </IonLabel>

          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">Building No.:</span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData.bldg_no}
              onIonChange={(e) =>
                setEditedData((prevData: any) => ({
                  ...prevData,
                  bldg_no: e.detail.value!,
                }))
              }
            />
          </IonLabel>
          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">Street:</span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData.street}
              onIonChange={(e) =>
                setEditedData((prevData: any) => ({
                  ...prevData,
                  street: e.detail.value!,
                }))
              }
            />
          </IonLabel>
          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">City:</span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData.city}
              onIonChange={(e) =>
                setEditedData((prevData: any) => ({
                  ...prevData,
                  city: e.detail.value!,
                }))
              }
            />
          </IonLabel>
          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">Country:</span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData.country}
              onIonChange={(e) =>
                setEditedData((prevData: any) => ({
                  ...prevData,
                  country: e.detail.value!,
                }))
              }
            />
          </IonLabel>
          <IonButton
            onClick={handleSaveChanges}
            className="veditprofile-save-btn"
          >
            Save Changes
          </IonButton>
          {/* <IonButton onClick={handleOpenCamera}>Capture/Select Image</IonButton> */}
        </IonContent>
      </IonModal>
    </>
  );
};

export default EditVenueProfile;
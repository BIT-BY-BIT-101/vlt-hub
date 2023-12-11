import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
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
import React, { useEffect, useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Redirect, useHistory } from "react-router";

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
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Profile</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onClose}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* {profilePicture && (
            <IonImg id="profile-image" src={profilePicture} alt="Profile" />
          )} */}
          {/* ... (other input fields) */}
          {/* <IonButton onClick={handleCapturePicture}>Capture Picture</IonButton> */}
          {/* <IonItem>
            {userData?.fname} {userData?.lname}
          </IonItem> */}

          <IonItem>
            <IonLabel>First Name:</IonLabel>
            <IonInput
              value={editedData?.fname}
              onIonChange={(e) =>
                setEditedData((prevData: any) => ({
                  ...prevData,
                  fname: e.detail.value!,
                }))
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel>Last Name:</IonLabel>
            <IonInput
              value={editedData?.lname}
              onIonChange={(e) =>
                setEditedData((prevData: any) => ({
                  ...prevData,
                  lname: e.detail.value!,
                }))
              }
            />
          </IonItem>

          <IonItem>
            <IonLabel>Gender:</IonLabel>
            <IonSelect
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
          </IonItem>

          <IonItem>
            <IonLabel>Building No.:</IonLabel>
            <IonInput
              value={editedData.bldg_no}
              onIonChange={(e) =>
                setEditedData((prevData: any) => ({
                  ...prevData,
                  bldg_no: e.detail.value!,
                }))
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel>Street:</IonLabel>
            <IonInput
              value={editedData.street}
              onIonChange={(e) =>
                setEditedData((prevData: any) => ({
                  ...prevData,
                  street: e.detail.value!,
                }))
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel>City:</IonLabel>
            <IonInput
              value={editedData.city}
              onIonChange={(e) =>
                setEditedData((prevData: any) => ({
                  ...prevData,
                  city: e.detail.value!,
                }))
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel>Country:</IonLabel>
            <IonInput
              value={editedData.country}
              onIonChange={(e) =>
                setEditedData((prevData: any) => ({
                  ...prevData,
                  country: e.detail.value!,
                }))
              }
            />
          </IonItem>
          <IonButton onClick={handleSaveChanges}>Save Changes</IonButton>
          {/* <IonButton onClick={handleOpenCamera}>Capture/Select Image</IonButton> */}
        </IonContent>
      </IonModal>
    </>
  );
};

export default EditVenueProfile;

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
import React, { useState } from "react";

type EditProps = {
  userData: any;
  isOpen: boolean;
  onClose: () => void;
};

const EditVenueProfile: React.FC<any> = ({ userData, isOpen, onClose }) => {
  const [editedData, setEditedData] = useState({ ...userData });
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
          <IonItem>
            <IonLabel>Bio:</IonLabel>
            <IonInput
              value={editedData.bio}
              onIonChange={(e) =>
                setEditedData((prevData) => ({
                  ...prevData,
                  bio: e.detail.value!,
                }))
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel>First Name:</IonLabel>
            <IonInput
              value={editedData.fname}
              onIonChange={(e) =>
                setEditedData((prevData) => ({
                  ...prevData,
                  fname: e.detail.value!,
                }))
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel>Last Name:</IonLabel>
            <IonInput
              value={editedData.lname}
              onIonChange={(e) =>
                setEditedData((prevData) => ({
                  ...prevData,
                  lname: e.detail.value!,
                }))
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel>Age:</IonLabel>
            <IonInput
              value={editedData.age}
              onIonChange={(e) =>
                setEditedData((prevData) => ({
                  ...prevData,
                  age: e.detail.value!,
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
                setEditedData((prevData) => ({
                  ...prevData,
                  gender: e.detail.value!,
                }))
              }
            >
              <IonSelectOption value="Male">Male</IonSelectOption>
              <IonSelectOption value="Female">Female</IonSelectOption>
            </IonSelect>
          </IonItem>
          {/* <IonItem>
          <IonLabel>Gender:</IonLabel>
          <IonInput value={editedData.gender} />
        </IonItem> */}
          <IonItem>
            <IonLabel>Building No.:</IonLabel>
            <IonInput
              value={editedData.bldg_no}
              onIonChange={(e) =>
                setEditedData((prevData) => ({
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
                setEditedData((prevData) => ({
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
                setEditedData((prevData) => ({
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
                setEditedData((prevData) => ({
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

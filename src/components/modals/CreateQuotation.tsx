import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonDatetimeButton,
  IonDatetime,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useState } from "react";

type Props = {
  //   userData: any;
  isOpen: boolean;
  onDidDismissal: () => void;
  onClose: () => void;
};

const CreateQuotation = ({ isOpen, onDidDismissal, onClose }: Props) => {
  const [editedData, setEditedData] = useState<>();
  const handleInputChange = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLIonInputElement;
    setEditedData((prevData: any) => ({
      ...prevData,
      [name]: name === "birthdate" ? value.toString() : value,
    }));
  };
  return (
    <>
      <IonModal
        isOpen={isOpen}
        onDidDismiss={onDidDismissal}
        // className="veditprofile-modal"
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Profile</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onDidDismissal}>
                <IonIcon icon={closeCircle} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="veditprofile-modal-content">
          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">Name:</span>
            <IonInput
              className="veditprofile-form-input"
              name="fname"
              // onIonChange={(e) =>
              //   setEditedData((prevData: any) => ({
              //     ...prevData,
              //     fname: e.detail.value!,
              //   }))
              // }
              onIonChange={handleInputChange}
            />
          </IonLabel>

          <IonLabel className="veditprofile-form-label">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonLabel className="veditprofile-form-label">
                    Date of Birth:
                  </IonLabel>
                </IonCol>
                <IonCol>
                  <IonDatetimeButton
                    datetime="date"
                    // className="hsignup-birthdate-button"
                    style={{ color: "black" }}
                  ></IonDatetimeButton>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonModal keepContentsMounted={true}>
              <IonDatetime
                presentation="date"
                id="date"
                showDefaultButtons={true}
                name="birthdate"
                onIonChange={handleInputChange}
                value={
                  editedData?.birthdate
                    ? editedData?.birthdate || maxDate
                    : userData?.birthdate
                }
                min={minDate}
                max={maxDate}
              ></IonDatetime>
            </IonModal>
          </IonLabel>

          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">Sex:</span>
            <IonSelect
              className="veditprofile-form-select"
              // interface="action-sheet"
              interface="popover"
              placeholder="Select Your Sex"
              name="gender"
              value={
                editedData?.gender
                  ? editedData?.gender
                  : "Please Specify your Sex"
              }
              // onIonChange={(e) =>
              //   setEditedData((prevData: any) => ({
              //     ...prevData,
              //     gender: e.detail.value!,
              //   }))
              // }
              onIonChange={handleInputChange}
            >
              <IonSelectOption value="Male">Male</IonSelectOption>
              <IonSelectOption value="Female">Female</IonSelectOption>
            </IonSelect>
          </IonLabel>

          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">
              Building/Floor/Block Number:
            </span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData?.bldg_no}
              name="bldg_no"
              // onIonChange={(e) =>
              //   setEditedData((prevData: any) => ({
              //     ...prevData,
              //     bldg_no: e.detail.value!,
              //   }))
              // }
              onIonChange={handleInputChange}
            />
          </IonLabel>
          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">Street:</span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData?.street}
              name="street"
              // onIonChange={(e) =>
              //   setEditedData((prevData: any) => ({
              //     ...prevData,
              //     street: e.detail.value!,
              //   }))
              // }
              onIonChange={handleInputChange}
            />
          </IonLabel>
          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">City:</span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData?.city}
              name="city"
              // onIonChange={(e) =>
              //   setEditedData((prevData: any) => ({
              //     ...prevData,
              //     city: e.detail.value!,
              //   }))
              // }
              onIonChange={handleInputChange}
            />
          </IonLabel>
          {/* <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">Country:</span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData?.country}
              name="country"
              // onIonChange={(e) =>
              //   setEditedData((prevData: any) => ({
              //     ...prevData,
              //     country: e.detail.value!,
              //   }))
              // }
              onIonChange={handleInputChange}
            />
          </IonLabel> */}
        </IonContent>
        <IonButton
          onClick={handleSaveChanges}
          className="veditprofile-save-btn"
        >
          Save Changes
        </IonButton>
        {/* <IonButton onClick={handleOpenCamera}>Capture/Select Image</IonButton> */}
      </IonModal>
    </>
  );
};

export default CreateQuotation;

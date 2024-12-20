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
  IonSelect,
  IonSelectOption,
  IonCol,
  IonDatetime,
  IonDatetimeButton,
  IonGrid,
  IonRow,
  IonItem,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import "./EditProfile.css";
import { serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import {
  getMinimumDate,
  getMaximumDate,
} from "../../helpers/DateTimeFunctions";
import { UserDataModel } from "../../models/Model";

type EditProps = {
  userData: any;
  isOpen: boolean;
  onDidDismissal: () => void;
  onClose: () => void;
};

const EditProfile: React.FC<EditProps> = ({
  userData,
  isOpen,
  onDidDismissal,
  onClose,
}) => {
  const { currentUser } = useContext(AuthContext);
  const { updateData } = useFirestore("profiles");

  const [editedData, setEditedData] = useState<UserDataModel>();

  useEffect(() => {
    setEditedData(userData);
    console.table(editedData);
  }, [isOpen]);

  // console.log(editedData);

  const handleSaveChanges = async (e: any) => {
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
              const userId = currentUser?.uid;

              console.log("User ID:", userId);

              // Combine the state and any other data needed

              // Call the createEvent function to add the event data to Firebase

              await updateData(userId, {
                ...editedData,
                updatedAt: serverTimestamp(),
              });

              // Optionally, you can reset the form after successful submission
              // reset();

              // Log success or navigate to another page
              console.log("Successfully Updated!");
            })
            .then(() => {
              Swal.fire({
                heightAuto: false,
                icon: "success",
                title: "Successfully added!",
              }).then(() => {
                // handleWindowRoute("/venue/profile");
                onClose();
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

    // try {
    //   // const userEmail = localStorage.getItem("session")!;
    //   const user = auth.currentUser?.uid;

    //   if (user) {
    //     await updateData(user, editedData);

    //     onClose();

    //     // history.push("/venue/home");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   console.error;
    // }
  };

  const handleInputChange = (e: CustomEvent) => {
    const { name, value } = e.target;
    setEditedData((prevData: any) => ({
      ...prevData,
      [name]: name === "birthdate" ? value.toString() : value,
    }));
  };

  const minDate = getMinimumDate();
  const maxDate = getMaximumDate();

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
          <IonItem color={"none"}>
            <h2 style={{ color: "black", fontWeight: "bold" }}>
              Personal Information
            </h2>
          </IonItem>
          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">Name:</span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData?.fname}
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
            <span className="veditprofile-form-title">Last Name:</span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData?.lname}
              name="lname"
              // onIonChange={(e) =>
              //   setEditedData((prevData: any) => ({
              //     ...prevData,
              //     lname: e.detail.value!,
              //   }))
              // }
              onIonChange={handleInputChange}
            />
          </IonLabel>
          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">Date of Birth:</span>
            <IonDatetimeButton
              datetime="date"
              className="form-datetime-button"
              style={{ color: "black" }}
            ></IonDatetimeButton>
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

          <IonItem color={"none"}>
            <h2 style={{ color: "black", fontWeight: "bold" }}>
              Company/Organization Information
            </h2>
          </IonItem>

          <IonLabel className="veditprofile-form-label">
            <span className="veditprofile-form-title">
              Company/Organization Name
            </span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData?.company_name}
              name="company_name"
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
            <span className="veditprofile-form-title">
              Company/Organization Address
            </span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData?.company_address}
              name="company_address"
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
            <span className="veditprofile-form-title">
              Company/Organization Contact Number
            </span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData?.company_tel}
              name="company_tel"
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
            <span className="veditprofile-form-title">
              Company/Organization Email Address
            </span>
            <IonInput
              className="veditprofile-form-input"
              value={editedData?.company_email}
              name="company_email"
              // onIonChange={(e) =>
              //   setEditedData((prevData: any) => ({
              //     ...prevData,
              //     bldg_no: e.detail.value!,
              //   }))
              // }
              onIonChange={handleInputChange}
            />
          </IonLabel>
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

export default EditProfile;

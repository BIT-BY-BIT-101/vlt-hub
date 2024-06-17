import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import useFirestore from "../../hooks/useFirestore";
import EditVenueProfile from "../modals/EditVenueProfile";
import "./ProfileCard.css";
import { formatDateString } from "../../functions/functions";

const ProfileCard = () => {
  const { userData } = useFirebaseAuth();
  // const { userData } = useFirestore(`profiles`);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <IonCard className="profile-card">
        <IonCardHeader>
          <IonCardTitle className="profile-card-title">Profile</IonCardTitle>
        </IonCardHeader>

        {/* <IonItem>{userData?.email}</IonItem> */}
        <IonLabel className="profile-form-label">
          <span className="profile-form-title">Name:</span>
          {userData?.fname} {userData?.lname}
        </IonLabel>
        <IonLabel className="profile-form-label">
          <span className="profile-form-title">Birthdate:</span>
          {/* {userData?.birthdate} */}
          {formatDateString(userData?.birthdate)}
        </IonLabel>
        <IonLabel className="profile-form-label">
          <span className="profile-form-title">Gender:</span>
          {userData?.gender}
        </IonLabel>
        <IonLabel className="profile-form-label">
          <span className="profile-form-title">Address:</span>
          {userData?.bldg_no} {userData?.street} {userData?.city}{" "}
          {userData?.country}
        </IonLabel>

        <div className="profilecard-btn">
          <IonButton
            slot="start"
            fill="clear"
            onClick={handleOpenModal}
            className="profile-edit-btn"
          >
            Edit Profile
          </IonButton>
          <IonButton
            fill="clear"
            slot="start"
            onClick={history.goBack}
            className="profile-back-btn"
          >
            Back
          </IonButton>
        </div>
        <EditVenueProfile
          isOpen={showModal}
          onClose={handleCloseModal}
          onDidDismissal={handleCloseModal}
          userData={userData}
        />
      </IonCard>
    </>
  );
};

export default ProfileCard;

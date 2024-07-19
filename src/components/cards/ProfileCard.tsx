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
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import useFirestore from "../../hooks/useFirestore";
import EditVenueProfile from "../modals/EditVenueProfile";
import "./ProfileCard.css";
import { formatDateString } from "../../helpers/DateTimeFunctions";

import EditProfile from "../modals/EditProfile";
import UploadProfileImg from "../modals/UploadProfileImg";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";

const ProfileCard = () => {
  const { userData } = useFirebaseAuth();
  // const { userData } = useFirestore(`profiles`);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUploadImg, setShowUploadImg] = useState(false);

  const handleOpenEditProfile = () => {
    setShowEditModal(true);
  };
  const handleOpenUploadImg = () => {
    setShowUploadImg(true);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  const handleCloseUploadImg = () => {
    setShowUploadImg(false);
  };

  return (
    <IonCard className="profile-card">
      <IonCardHeader>
        <IonItem className="item-color-dark">
          <IonButtons slot="end">
            {/* <IonButton
                slot="start"
                fill="clear"
                onClick={handleOpenEditProfile}
                className="profile-edit-btn"
              >
                Edit Profile
              </IonButton> */}
            <PrimaryButton slot="end" onClick={handleOpenEditProfile}>
              Edit Profile
            </PrimaryButton>
          </IonButtons>
          <IonButtons slot="start">
            <SecondaryButton slot="start">Back</SecondaryButton>
          </IonButtons>
        </IonItem>
      </IonCardHeader>

      {/* <IonItem>{userData?.email}</IonItem> */}
      <IonList className="item-color-dark">
        <IonItem className="item-color-dark">
          <IonThumbnail slot="start" onClick={handleOpenUploadImg}>
            <img
              alt="Silhouette of mountains"
              src={
                userData?.photoURL
                  ? userData?.photoURL
                  : "https://ionicframework.com/docs/img/demos/thumbnail.svg"
              }
            />
          </IonThumbnail>
          <IonLabel className="profile-form-label">
            {userData?.fname} {userData?.lname}
          </IonLabel>
        </IonItem>

        <IonItem className="item-color-dark">
          <IonLabel className="profile-form-label">
            <span className="profile-form-title">Birthdate: </span>
            {/* {userData?.birthdate} */}
            {formatDateString(userData?.birthdate)}
          </IonLabel>
        </IonItem>
        <IonItem className="item-color-dark">
          <IonLabel className="profile-form-label">
            <span className="profile-form-title">Gender: </span>
            {userData?.gender}
          </IonLabel>
        </IonItem>
        <IonItem className="item-color-dark">
          <IonLabel className="profile-form-label">
            <span className="profile-form-title">Address: </span>
            {userData?.bldg_no} {userData?.street} {userData?.city}{" "}
            {userData?.country}
          </IonLabel>
        </IonItem>
      </IonList>

      <EditProfile
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        onDidDismissal={handleCloseEditModal}
        userData={userData}
      />
      <UploadProfileImg
        isOpen={showUploadImg}
        onClose={handleCloseUploadImg}
        userData={userData}
        onDidDismissal={handleCloseUploadImg}
      />
    </IonCard>
  );
};

export default ProfileCard;

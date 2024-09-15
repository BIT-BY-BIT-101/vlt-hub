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
    <>
      <IonCard className="card card-border">
        <IonCardHeader>
          <IonItem className="item-bg-none">
            {/* <IonButtons slot="end">
            <PrimaryButton slot="end" onClick={handleOpenEditProfile}>
              Edit Profile
            </PrimaryButton>
          </IonButtons> */}
            <IonButton slot="end" shape="round" onClick={handleOpenEditProfile}>
              Edit Profile
            </IonButton>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          {/* <IonItem>{userData?.email}</IonItem> */}
          <IonItem className="item-bg-none">
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
            <IonLabel>
              {userData?.fname} {userData?.lname}
              <p>{userData?.email}</p>
            </IonLabel>
          </IonItem>

          <IonItem className="item-bg-none">
            <IonLabel className="profile-form-label">
              <span className="profile-form-title">Birthdate: </span>
              {/* {userData?.birthdate} */}
              {formatDateString(userData?.birthdate)}
            </IonLabel>
          </IonItem>
          <IonItem className="item-bg-none">
            <IonLabel className="profile-form-label">
              <span className="profile-form-title">Sex: </span>
              {userData?.gender}
            </IonLabel>
          </IonItem>
          <IonItem className="item-bg-none">
            <IonLabel className="profile-form-label">
              <span className="profile-form-title">Address: </span>
              {userData?.bldg_no} {userData?.street} {userData?.city}{" "}
              {userData?.country}
            </IonLabel>
          </IonItem>
        </IonCardContent>

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
    </>
  );
};

export default ProfileCard;

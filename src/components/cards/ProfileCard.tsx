import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonFooter,
  IonItem,
  IonList,
} from "@ionic/react";
import React, { useState } from "react";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import EditVenueProfile from "../modals/EditVenueProfile";

const ProfileCard = () => {
  const { userData } = useFirebaseAuth();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Profile</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonList>
            <IonItem>
              {userData?.fname} {userData?.lname}
            </IonItem>
          </IonList>
        </IonCardContent>
        <IonFooter>
          <IonButton onClick={handleOpenModal}>Edit Profile</IonButton>
        </IonFooter>
        {/* <EditVenueProfile
          isOpen={showModal}
          onClose={handleCloseModal}
          userData={userData}
        /> */}
      </IonCard>
    </div>
  );
};

export default ProfileCard;

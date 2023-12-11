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
import useFirestore from "../../hooks/useFirestore";
import { useHistory } from "react-router";

const ProfileCard = () => {
  // const { userData } = useFirebaseAuth();
  const { userData } = useFirestore(`profiles`);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const originalDateString = "1992-12-11T21:32:00";
  const dateObject = new Date(originalDateString);

  // const options = { year: "numeric", month: "long", day: "numeric" };
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDateString = dateObject.toLocaleDateString("en-US", options);
  return (
    <div>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Profile</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonList>
            {/* <IonItem>{userData?.email}</IonItem> */}
            <IonItem>
              <p>
                <strong>Name: </strong>
                {userData?.fname} {userData?.lname}
              </p>
            </IonItem>
            <IonItem>
              <p>
                <strong>Birthdate: </strong>
                {/* {userData?.birthdate} */}
                {formattedDateString}
              </p>
            </IonItem>
            <IonItem>
              <p>
                <strong>Gender: </strong>
                {userData?.gender}
              </p>
            </IonItem>
            <IonItem>
              <p>
                <strong>Address: </strong>
                {userData?.bldg_no} {userData?.street} {userData?.city}{" "}
                {userData?.country}
              </p>
            </IonItem>
          </IonList>
        </IonCardContent>
        <IonFooter>
          <IonButton slot="start" onClick={handleOpenModal}>
            Edit Profile
          </IonButton>
          <IonButton fill="outline" slot="start" onClick={history.goBack}>
            Back
          </IonButton>
        </IonFooter>
        <EditVenueProfile
          isOpen={showModal}
          onClose={handleCloseModal}
          userData={userData}
        />
      </IonCard>
    </div>
  );
};

export default ProfileCard;

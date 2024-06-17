import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import ProfileCard from "../components/cards/ProfileCard";
import ParticipantHeader from "../components/participant/ParticipantHeader";

export const ProfilePage = () => {
  return (
    <IonPage>
      <ParticipantHeader />
      {/* <IonContent>
        <ProfileCard />
      </IonContent> */}
    </IonPage>
  );
};

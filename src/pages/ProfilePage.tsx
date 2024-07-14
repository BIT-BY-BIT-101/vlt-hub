import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import ProfileCard from "../components/cards/ProfileCard";
import ParticipantHeader from "../components/participant/ParticipantHeader";
import Header from "../components/header/Header";

export const ProfilePage = () => {
  return (
    <IonPage>
      <Header />
      {/* <IonContent>
        <ProfileCard />
      </IonContent> */}
    </IonPage>
  );
};

import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import ProfileCard from "../../components/cards/ProfileCard";

export const ParticipantProfilePage = () => {
  return (
    <IonPage>
      <IonContent>
        <ProfileCard />
      </IonContent>
    </IonPage>
  );
};

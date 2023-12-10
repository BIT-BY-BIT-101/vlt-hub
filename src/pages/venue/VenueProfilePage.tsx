import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import ProfileCard from "../../components/cards/ProfileCard";

export const VenueProfilePage = () => {
  return (
    <IonPage>
      <IonContent>
        <ProfileCard />
      </IonContent>
    </IonPage>
  );
};

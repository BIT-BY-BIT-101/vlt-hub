import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import React from "react";
import ProfileCard from "../../components/cards/ProfileCard";
import ParticipantHeader from "../../components/participant/ParticipantHeader";
import ParticipantSidePane from "../../components/participant/ParticipantSidePane";

export const ParticipantProfilePage = () => {
  return (
    <IonPage>
      <ParticipantHeader />
      <IonContent>
        <IonGrid>
          <IonRow>
            <ParticipantSidePane />
            <IonCol size="10">
              <ProfileCard />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

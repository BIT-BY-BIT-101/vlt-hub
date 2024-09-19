import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import React from "react";
import ProfileCard from "../../components/cards/ProfileCard";
import ParticipantHeader from "../../components/participant/ParticipantHeader";
import ParticipantSidePane from "../../components/participant/ParticipantSidePane";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import SidePanel from "../../components/SidePanel";

export const ParticipantProfilePage = () => {
  return (
    <>
      <Menus />
      <IonPage>
        <Header />
        <IonContent>
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              {/* <SidePanel /> */}
              <IonCol>
                <ProfileCard />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

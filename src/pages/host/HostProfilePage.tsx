import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import React from "react";
import ProfileCard from "../../components/cards/ProfileCard";
import Header from "../../components/header/Header";
import SidePanel from "../../components/SidePanel";
import ParticipantSidePane from "../../components/participant/ParticipantSidePane";
import Menus from "../../components/menus/Menus";

export const HostProfilePage = () => {
  return (
    <>
      <Menus />
      <IonPage id="main">
        <Header />
        <IonContent>
          <IonGrid>
            <IonRow>
              <SidePanel />
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

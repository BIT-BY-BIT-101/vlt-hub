import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import React from "react";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import EventDetail from "../../components/EventDetail";

const HostEventDetailPage = () => {
  return (
    <>
      {/* <ParticipantNavMenu /> */}
      <Menus />
      <IonPage id="main">
        <Header />

        <IonContent>
          <IonGrid>
            <IonRow>
              {/* <ParticipantSidePane /> */}
              {/* <SidePanel /> */}
              <IonCol>
                <EventDetail />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostEventDetailPage;

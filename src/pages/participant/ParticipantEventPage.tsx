import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import React from "react";
import ParticipantNavMenu from "../../components/menus/ParticipantNavMenu";
import "./ParticipantEventPage.css";
import ParticipantHeader from "../../components/participant/ParticipantHeader";
import RegisteredEventsCard from "../../components/participant/RegisteredEventsCard";
import ParticipantSidePane from "../../components/participant/ParticipantSidePane";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import SidePanel from "../../components/SidePanel";

const ParticipantEventPage: React.FC = () => {
  return (
    <>
      {/* <ParticipantNavMenu /> */}
      <Menus />
      <IonPage>
        {/* <ParticipantHeader /> */}
        <Header />

        <IonContent id="phome-main">
          <IonGrid>
            <IonRow>
              {/* <ParticipantSidePane /> */}
              <SidePanel />
              <IonCol size="10">
                <IonRow>
                  <RegisteredEventsCard />
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ParticipantEventPage;

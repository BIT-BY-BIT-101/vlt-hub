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
import EventsCalendarCard from "../../components/participant/EventsCalendarCard";

const ParticipantEventPage: React.FC = () => {
  return (
    <>
      <Menus />
      <IonPage id="main">
        <Header />

        <IonContent>
          <IonGrid>
            <IonRow>
              {/* <SidePanel /> */}

              <IonCol>
                {/* <EventsCalendarCard /> */}
                <RegisteredEventsCard />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ParticipantEventPage;

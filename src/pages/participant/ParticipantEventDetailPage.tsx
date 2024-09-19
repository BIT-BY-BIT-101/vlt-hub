import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import "./ParticipantEventPage.css";
import EventsDetailCard from "../../components/participant/EventDetail";
import { useHistory } from "react-router";
import Menus from "../../components/menus/Menus";
import Header from "../../components/header/Header";
import RegisteredEventDetails from "../../components/participant/RegisteredEventDetails";
import EventDetail from "../../components/participant/EventDetail";

const ParticipantEventDetailPage: React.FC = () => {
  const history = useHistory();
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

export default ParticipantEventDetailPage;

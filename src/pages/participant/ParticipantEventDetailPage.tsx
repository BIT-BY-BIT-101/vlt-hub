import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonModal,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useState } from "react";
import HostImg from "../../assets/host.jpg";
import HostImg2 from "../../assets/host2.jpg";
import MetaSafety from "../../assets/metasafety.jpg";
import ParticipantNavMenu from "../../components/menus/ParticipantNavMenu";
import "./ParticipantEventPage.css";
import EventsDetailCard from "../../components/cards/EventsDetailCard";
import { useHistory } from "react-router";

const ParticipantEventDetailPage: React.FC = () => {
  const history = useHistory();
  return (
    <>
      {/* <ParticipantNavMenu /> */}
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start" onClick={history.goBack}>
              Back
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <EventsDetailCard />
        </IonContent>
      </IonPage>
    </>
  );
};

export default ParticipantEventDetailPage;

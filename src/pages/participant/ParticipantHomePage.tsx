import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useState } from "react";
import HostImg from "../../assets/host.jpg";
import IntrotoCSharp from "../../assets/introtocsharp.jpg";
import MetaSafety from "../../assets/metasafety.jpg";
import techythursdays from "../../assets/techythursdays.jpg";
import Logo from "../../assets/user.jpg";
import ParticipantNavMenu from "../../components/menus/ParticipantNavMenu";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import "./ParticipantHomePage.css";
import EventsCard from "../../components/cards/EventsCard";
import EventsModal from "../../components/modals/EventsModal";
import useFirebaseStorage from "../../hooks/useFirestorage";
import useFirestore from "../../hooks/useFirestore";

const ParticipantHomePage: React.FC = () => {
  const { data, error } = useFirestore("events");

  return (
    <IonPage>
      <ParticipantNavMenu />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton autoHide={false}></IonMenuButton>
          </IonButtons>
          {/* <IonMenuButton slot="start" /> */}
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="phome-main">
        <div className="phome-cards-container">
          <EventsCard />

          {/* Modal */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ParticipantHomePage;

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
import HostNavMenu from "../../components/menus/HostNavMenu";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import "./HostHomePage.css";
import EventsCard from "../../components/cards/EventsCard";

const HostHomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <HostNavMenu />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>
            {/* <IonMenuButton slot="start" /> */}
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent id="main">
          <div className="hhome-cards-container">
            <EventsCard />
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostHomePage;

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import HostNavMenu from "../../components/menus/HostNavMenu";
import "./HostHomePage.css";
import EventsCard from "../../components/cards/EventsCard";

const HostHomePage: React.FC = () => {
  // const [showModal, setShowModal] = useState(false);

  // const openModal = () => setShowModal(true);
  // const closeModal = () => setShowModal(false);

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

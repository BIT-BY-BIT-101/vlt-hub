import {
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import HostNavMenu from "../../components/menus/HostNavMenu";
import "./HostHomePage.css";
import EventsCard from "../../components/participant/EventsCard";

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
            {/* <IonGrid>
              <IonRow> */}
            <EventsCard />
            {/* </IonRow>
            </IonGrid> */}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostHomePage;

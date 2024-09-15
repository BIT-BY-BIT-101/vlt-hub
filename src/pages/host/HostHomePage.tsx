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
import Header from "../../components/header/Header";
import SidePanel from "../../components/SidePanel";
import Menus from "../../components/menus/Menus";

const HostHomePage: React.FC = () => {
  // const [showModal, setShowModal] = useState(false);

  // const openModal = () => setShowModal(true);
  // const closeModal = () => setShowModal(false);

  return (
    <>
      {/* <HostNavMenu /> */}
      <Menus />

      <IonPage id="main">
        <Header />
        {/* <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>

            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <IonContent>
          <IonGrid>
            <IonRow>
              {/* <SidePanel /> */}
              <EventsCard />
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostHomePage;

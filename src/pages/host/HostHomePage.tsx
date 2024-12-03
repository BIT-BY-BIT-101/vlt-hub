import {
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
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
import HostDashboard from "../../components/host/HostDashboard";

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
            <IonItem
              color={"none"}
              lines="none"
              style={{ color: "var(--ion-color-primary)" }}
            >
              <IonLabel>
                <h1>
                  <strong>Dashboard</strong>
                </h1>
              </IonLabel>
            </IonItem>
            <IonRow className="ion-justify-content-center ion-align-items-center">
              <HostDashboard />
            </IonRow>
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

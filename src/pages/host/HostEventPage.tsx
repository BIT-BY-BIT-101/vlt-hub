import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useState } from "react";
import HostImg from "../../assets/host.jpg";
import MetaSafety from "../../assets/metasafety.jpg";
import HostNavMenu from "../../components/menus/HostNavMenu";
import "./HostEventPage.css";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import SidePanel from "../../components/SidePanel";
import HostEventCalendar from "../../components/host/HostEventCalendar";

const HostEventPage: React.FC = () => {
  return (
    <>
      <Menus />
      <IonPage id="main">
        <Header />

        <IonContent>
          <IonGrid>
            <IonRow>
              <SidePanel />
              <IonCol>
                <HostEventCalendar />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostEventPage;

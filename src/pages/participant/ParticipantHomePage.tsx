import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonModal,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle, notificationsOutline, search } from "ionicons/icons";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import HostImg from "../../assets/host.jpg";
import IntrotoCSharp from "../../assets/introtocsharp.jpg";
import MetaSafety from "../../assets/metasafety.jpg";
import techythursdays from "../../assets/techythursdays.jpg";
import Logo from "../../assets/user.jpg";
import ParticipantNavMenu from "../../components/menus/ParticipantNavMenu";
import EventsModal from "../../components/modals/EventsModal";
import EventsCard from "../../components/participant/EventsCard";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import useFirebaseStorage from "../../hooks/useFirestorage";
import useFirestore from "../../hooks/useFirestore";
import "./ParticipantHomePage.css";
import ParticipantHeader from "../../components/participant/ParticipantHeader";
import ParticipantSidePane from "../../components/participant/ParticipantSidePane";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import SidePanel from "../../components/SidePanel";

const ParticipantHomePage = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  if (currentUser?.data.role === "host" || currentUser?.data.role === "venue") {
    // return history.push("/participant/signin");
    return (window.location.href = "/participant/signin");
  }
  return (
    <>
      <ParticipantNavMenu />
      {/* <Menus /> */}
      <IonPage>
        {/* <ParticipantHeader /> */}
        <Header />
        {/* <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>  
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <IonContent id="phome-main">
          <IonGrid>
            <IonRow>
              {/* <ParticipantSidePane /> */}
              <SidePanel />

              <IonCol size="10">
                <IonRow>
                  <EventsCard />
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ParticipantHomePage;

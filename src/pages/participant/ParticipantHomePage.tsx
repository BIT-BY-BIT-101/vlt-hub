import {
  IonButton,
  IonButtons,
  IonCard,
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

const ParticipantHomePage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (event: CustomEvent) => {
    setSearchText(event.detail.value);
  };
  return (
    <>
      <ParticipantNavMenu />
      <IonPage>
        {/* <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>  
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <IonHeader>
          <IonToolbar className="custom-toolbar">
            <IonMenuButton slot="start" className="menu-button" />
            {/* <div className="logo-container">
              <img src={Logo} alt="V.L.T. Logo" className="vlt-logo" />
            </div> */}
            <div className="title-search-container">
              <div className="title-container">
                <IonTitle className="title-with-logo">V.L.T. Hub</IonTitle>
              </div>
              <IonSearchbar
                className="navsearch-bar"
                placeholder="Search events"
                onIonChange={handleSearchChange}
              ></IonSearchbar>
            </div>
            <IonButton slot="end" className="login-button">
              Login/Signup
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent id="phome-main">
          <div
          // className="phome-cards-container"
          >
            <IonGrid>
              <IonRow>
                <EventsCard />
              </IonRow>
            </IonGrid>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ParticipantHomePage;

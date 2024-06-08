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
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
            <IonGrid>
              <IonRow className="ion-align-items-center ion-justify-content-between">
                <IonCol size="auto">
                  <IonMenuToggle>
                    <IonMenuButton className="menu-button" />
                  </IonMenuToggle>
                </IonCol>
                <IonCol size="auto">
                  <div className="title-container">
                    <IonTitle className="title-with-logo">V.L.T. Hub</IonTitle>
                  </div>
                </IonCol>
                <IonCol size="auto">
                  <IonSearchbar
                    className="navsearch-bar"
                    placeholder="Search events"
                    onIonChange={handleSearchChange}
                  ></IonSearchbar>
                  <IonIcon icon={search} className="search-icon"></IonIcon>
                </IonCol>
                <IonCol size="auto" className="header-link-host-event">
                  <Link to="/host/signin" className="header-link">
                    Host an event
                  </Link>
                </IonCol>
                <IonCol size="auto" className="header-link-my-events">
                  <span className="header-link">My events</span>
                </IonCol>
                {/* <IonCol offset="1" size="auto">
                  <IonIcon
                    icon={notificationsOutline}
                    className="notification-icon"
                  ></IonIcon>
                </IonCol> */}
                <IonCol size="auto" className="login-button">
                  <IonButton className="nav-login-signup-button">
                    Login/Signup
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        </IonHeader>
        <IonContent id="phome-main">
          <div className="phome-cards-container">
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

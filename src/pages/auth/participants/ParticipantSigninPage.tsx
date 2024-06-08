import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { notificationsOutline, search } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";
import ParticipantSigninComponent from "../../../components/auth/participant/ParticipantSigninComponent";

export default function ParticipantSigninPage() {
  return (
    <IonPage>
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
              {/* <IonCol size="auto">
                <IonSearchbar
                  className="navsearch-bar"
                  placeholder="Search events"
                  onIonChange={handleSearchChange}
                ></IonSearchbar>
                <IonIcon icon={search} className="search-icon"></IonIcon>
              </IonCol> */}
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
                <IonButton className="nav-login-signup-button" href="/">
                  Login/Signup
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <ParticipantSigninComponent />
      </IonContent>
    </IonPage>
  );
}

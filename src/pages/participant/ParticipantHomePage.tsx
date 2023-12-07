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
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { calendar, home, location, logOut, pencil, time } from "ionicons/icons";
import React from "react";
import IntrotoCSharp from "../../assets/introtocsharp.jpg";
import MetaSafety from "../../assets/metasafety.jpg";
import techythursdays from "../../assets/techythursdays.jpg";
import Logo from "../../assets/user.jpg";
import UserEventsCard from "../../components/cards/UserEventsCard";
import ParticipantNavMenu from "../../components/menus/ParticipantNavMenu";
import "./ParticipantHomePage.css";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

const ParticipantHomePage: React.FC = () => {
  return (
    <IonPage>
      <ParticipantNavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="phome-main">
        <div className="phome-cards-container">
          <UserEventsCard />

          <IonCard className="phome-event-card">
            <IonImg
              src={MetaSafety}
              alt="Meta Safety in the Modern Age - Strategies for a Secure Digital
            Journey"
              className="phome-event-image"
            />
            <IonLabel>
              <h2 className="phome-event-title">
                Meta Safety in the Modern Age - Strategies for a Secure Digital
                Journey
              </h2>
              <IonLabel className="phome-event-details">
                <p>
                  <span>Date:</span> November 29, 2023
                </p>
                <p>
                  <span>Venue:</span> Zoom
                </p>
              </IonLabel>
            </IonLabel>
          </IonCard>

          <IonCard className="phome-event-card">
            <IonImg
              src={techythursdays}
              alt="#TechyThursdays - Introduction to Web 3.0"
              className="phome-event-image"
            />
            <IonLabel>
              <h2 className="phome-event-title">
                #TechyThursdays - Introduction to Web 3.0
              </h2>
              <IonLabel className="phome-event-details">
                <p>
                  <span>Date:</span> December 1, 2023
                </p>
                <p>
                  <span>Venue:</span> Zoom
                </p>
              </IonLabel>
            </IonLabel>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ParticipantHomePage;

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
import React from "react";
import IntrotoCSharp from "../../assets/introtocsharp.jpg";
import MetaSafety from "../../assets/metasafety.jpg";
import techythursdays from "../../assets/techythursdays.jpg";
import UserEventsCard from "../../components/cards/UserEventsCard";
import VenueNavMenu from "../../components/menus/VenueNavMenu";
import "./VenueHomePage.css";

const VenueHomePage: React.FC = () => {
  return (
    <IonPage>
      <VenueNavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="vhome-main">
        <div className="vhome-cards-container">
          <UserEventsCard />

          <IonCard className="vhome-event-card">
            <IonImg
              src={MetaSafety}
              alt="Meta Safety in the Modern Age - Strategies for a Secure Digital Journey"
              className="hhome-event-image"
            />
            <IonLabel>
              <h2 className="vhome-event-title">
                Meta Safety in the Modern Age - Strategies for a Secure Digital
                Journey
              </h2>
              <IonLabel className="vhome-event-details">
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Venue:</span> Zoom
                </p>
              </IonLabel>
            </IonLabel>
          </IonCard>

          <IonCard className="vhome-event-card">
            <IonImg
              src={techythursdays}
              alt="#TechyThursdays - Introduction to Web 3.0"
              className="vhome-event-image"
            />
            <IonLabel>
              <h2 className="vhome-event-title">
                #TechyThursdays - Introduction to Web 3.0
              </h2>
              <IonLabel className="vhome-event-details">
                <p>
                  <span>Date:</span> October 15, 2023
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

export default VenueHomePage;

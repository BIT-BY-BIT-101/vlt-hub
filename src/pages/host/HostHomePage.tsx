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
import HostNavMenu from "../../components/menus/HostNavMenu";
import "./HostHomePage.css";

const HostHomePage: React.FC = () => {
  return (
    <IonPage>
      <HostNavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="hhome-main">
        <div className="hhome-cards-container">
          <IonCard className="hhome-event-card">
            <IonImg
              src={IntrotoCSharp}
              alt="Mastering the Fundamentals: An Introduction to Visual C# Programming."
              className="hhome-event-image"
            />
            <IonLabel>
              <h2 className="hhome-event-title">
                Mastering the Fundamentals: An Introduction to Visual C#
                Programming
              </h2>
              <IonLabel className="hhome-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
              </IonLabel>
            </IonLabel>
          </IonCard>

          <IonCard className="hhome-event-card">
            <IonImg
              src={MetaSafety}
              alt="Meta Safety in the Modern Age - Strategies for a Secure Digital Journey"
              className="hhome-event-image"
            />
            <IonLabel>
              <h2 className="hhome-event-title">
                Meta Safety in the Modern Age - Strategies for a Secure Digital
                Journey
              </h2>
              <IonLabel className="hhome-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
              </IonLabel>
            </IonLabel>
          </IonCard>

          <IonCard className="hhome-event-card">
            <IonImg
              src={techythursdays}
              alt="#TechyThursdays - Introduction to Web 3.0"
              className="hhome-event-image"
            />
            <IonLabel>
              <h2 className="hhome-event-title">
                #TechyThursdays - Introduction to Web 3.0
              </h2>
              <IonLabel className="hhome-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
              </IonLabel>
            </IonLabel>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HostHomePage;

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
import HostImg from "../../assets/host.jpg";
import IntrotoCSharp from "../../assets/introtocsharp.jpg";
import MetaSafety from "../../assets/metasafety.jpg";
import techythursdays from "../../assets/techythursdays.jpg";
import Logo from "../../assets/user.jpg";
import ParticipantNavMenu from "../../components/menus/ParticipantNavMenu";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import "./ParticipantHomePage.css";

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
          <IonCard className="phome-event-card">
            <IonImg
              src={IntrotoCSharp}
              alt="Mastering the Fundamentals: An Introduction to Visual C# Programming."
              className="phome-event-image"
            />
            <IonLabel>
              <h2
                className="phome-event-title"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  lineHeight: "20px",
                  maxHeight: "40px",
                }}
              >
                Mastering the Fundamentals: An Introduction to Visual C#
                Programming
              </h2>
              <div className="phome-event-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="phome-event-host-img"
                />
                <p className="phome-event-host">Abdul Rauf M. Sultan</p>
              </div>
              <IonLabel className="phome-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
                <p className="phome-event-free">Free</p>
              </IonLabel>
            </IonLabel>
          </IonCard>

          <IonCard className="phome-event-card">
            <IonImg
              src={MetaSafety}
              alt="Meta Safety in the Modern Age - Strategies for a Secure Digital Journey"
              className="phome-event-image"
            />
            <IonLabel>
              <h2
                className="phome-event-title"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  lineHeight: "20px",
                  maxHeight: "40px",
                }}
              >
                Meta Safety in the Modern Age - Strategies for a Secure Digital
                Journey
              </h2>
              <div className="phome-event-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="phome-event-host-img"
                />
                <p className="phome-event-host">Abdul Rauf M. Sultan</p>
              </div>
              <IonLabel className="phome-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
                <p className="phome-event-paid">₱200.00</p>
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
              <h2
                className="phome-event-title"
                style={{
                  marginTop: "40px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  lineHeight: "20px",
                  maxHeight: "40px",
                }}
              >
                #TechyThursdays - Introduction to Web 3.0
              </h2>
              <div className="phome-event-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="phome-event-host-img"
                />
                <p className="phome-event-host">Abdul Rauf M. Sultan</p>
              </div>
              <IonLabel className="phome-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
                <p className="phome-event-free">Free</p>
              </IonLabel>
            </IonLabel>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ParticipantHomePage;

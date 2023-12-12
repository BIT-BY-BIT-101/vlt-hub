import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React from "react";
import { Link } from "react-router-dom";
import HomeSVG from "../assets/home.svg";
import Host from "../assets/host.svg";
import Logo from "../assets/logo.png";
import Participant from "../assets/participant.svg";
import Venue from "../assets/venue.svg";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <div className="left-section">
        <img src={HomeSVG} alt="HomeSVG" className="home-img" />
      </div>

      <div className="right-section">
        <IonCard className="home-card">
          <IonCardHeader>
            <div className="logo-container">
              <img src={Logo} alt="V.L.T. Hub" className="home-logo" />
            </div>
            <IonCardTitle className="home-heading">
              Welcome to V.L.T. Hub
            </IonCardTitle>
            <IonCardSubtitle className="home-subheading1">
              Pick your role!
            </IonCardSubtitle>
            <IonCardSubtitle className="home-subheading2">
              You are a...
            </IonCardSubtitle>
          </IonCardHeader>

          <Link to="/participant/signin">
            <IonCard className="user-card">
              <div className="user-card-left">
                <img src={Participant} alt="Participant SVG" />
              </div>
              <div className="user-card-right">
                <IonCardHeader>
                  <IonCardTitle className="user-card-title">
                    Participant
                  </IonCardTitle>
                  <IonCardSubtitle className="user-card-subtitle">
                    Join an event
                  </IonCardSubtitle>
                </IonCardHeader>
              </div>
            </IonCard>
          </Link>

          <Link to="/host/signin">
            <IonCard className="host-card">
              <div className="host-card-left">
                <img src={Host} alt="Host SVG" />
              </div>
              <div className="host-card-right">
                <IonCardHeader>
                  <IonCardTitle className="host-card-title">Host</IonCardTitle>
                  <IonCardSubtitle className="host-card-subtitle">
                    Host an event
                  </IonCardSubtitle>
                </IonCardHeader>
              </div>
            </IonCard>
          </Link>

          <Link to="/venue/signin">
            <IonCard className="venue-card">
              <div className="venue-card-left">
                <img src={Venue} alt="Venue SVG" />
              </div>
              <div className="venue-card-right">
                <IonCardHeader>
                  <IonCardTitle className="venue-card-title">
                    Venue
                  </IonCardTitle>
                  <IonCardSubtitle className="venue-card-subtitle">
                    List your venue
                  </IonCardSubtitle>
                </IonCardHeader>
              </div>
            </IonCard>
          </Link>
        </IonCard>
      </div>
    </div>
  );
};

export default HomePage;

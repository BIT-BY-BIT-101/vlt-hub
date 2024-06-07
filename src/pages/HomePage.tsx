import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { notificationsOutline, search } from "ionicons/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeSVG from "../assets/home.svg";
import Host from "../assets/host.svg";
import Logo from "../assets/logo.png";
import Participant from "../assets/participant.svg";
import Venue from "../assets/venue.svg";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event: CustomEvent) => {
    setSearchText(event.detail.value);
  };

  return (
    <IonPage>
      <IonMenu side="start" contentId="main-content" className="main-menu">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem button>
              <Link to="/participant/signin">Participant</Link>
            </IonItem>
            <IonItem button>
              <Link to="/host/signin">Host</Link>
            </IonItem>
            <IonItem button>
              <Link to="/venue/signin">Venue</Link>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonContent id="main-content">
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
                <IonCol offset="1" size="auto">
                  <IonIcon
                    icon={notificationsOutline}
                    className="notification-icon"
                  ></IonIcon>
                </IonCol>
                <IonCol size="auto" className="login-button">
                  <IonButton className="nav-login-signup-button">
                    Login/Signup
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        </IonHeader>

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
                      <IonCardTitle className="host-card-title">
                        Host
                      </IonCardTitle>
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
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

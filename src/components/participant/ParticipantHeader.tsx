import {
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonMenuToggle,
  IonMenuButton,
  IonTitle,
  IonSearchbar,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { search } from "ionicons/icons";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ParticipantHeader = (search: any) => {
  const { currentUser } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (event: CustomEvent) => {
    setSearchText(event.detail.value);
  };
  return (
    <>
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
                <Link to="/participant/events" className="header-link">
                  My Events
                </Link>
              </IonCol>
              {/* <IonCol offset="1" size="auto">
                  <IonIcon
                    icon={notificationsOutline}
                    className="notification-icon"
                  ></IonIcon>
                </IonCol> */}
              <IonCol size="2" className="login-button">
                {currentUser ? (
                  <span>Hello {currentUser?.data.fname}</span>
                ) : (
                  <IonButton className="nav-login-signup-button" href="">
                    Login/Signup
                  </IonButton>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default ParticipantHeader;

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
  IonItem,
  IonThumbnail,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { search, power } from "ionicons/icons";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LogoutModal from "../modals/LogoutModal";
import ParticipantHeader from "./ParticipantHeader";
import HostHeader from "./HostHeader";
import VenueHeader from "./VenueHeader";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleClick = () => {
    if (currentUser?.data.role === "host") {
      // window.location.href = "/host/home";
      history.push("/host/home");
    }
    if (currentUser?.data.role === "venue") {
      // window.location.href = "/venue/home";
      history.push("/venue/home");
    }
    if (currentUser?.data.role === "participant") {
      // window.location.href = "/participant/home";
      history.push("/participant/home");
    }
    if (!currentUser) {
      history.push("/participant/home");
    }
  };

  const handleModalClose = () => {
    setShowLogoutModal(false);
  };
  const handleSearchChange = (event: CustomEvent) => {
    setSearchText(event.detail.value);
  };

  // console.log(currentUser);

  if (currentUser?.data.role === "participant") {
    return <ParticipantHeader />;
  }

  if (currentUser?.data.role === "host") {
    return <HostHeader />;
  }

  if (currentUser?.data.role === "venue") {
    return <VenueHeader />;
  }

  return (
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
              <div
                className="title-container cursor-pointer"
                onClick={handleClick}
              >
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
            {currentUser?.data.role === "host" ? (
              <IonCol size="auto" className="header-link-host-event">
                <Link to="/host/home" className="header-link">
                  Create Course
                </Link>
              </IonCol>
            ) : (
              <IonCol size="auto" className="header-link-host-event">
                <Link to="/host/signin" className="header-link">
                  Create Course
                </Link>
              </IonCol>
            )}
            {currentUser?.data.role === "participant" ? (
              <IonCol size="auto" className="header-link-my-events">
                <Link to="/participant/signin" className="header-link">
                  My Learning
                </Link>
              </IonCol>
            ) : (
              <IonCol size="auto" className="header-link-my-events">
                <Link to="/participant/signin" className="header-link">
                  My Learning
                </Link>
              </IonCol>
            )}
            {/* <IonCol offset="1" size="auto">
                  <IonIcon
                    icon={notificationsOutline}
                    className="notification-icon"
                  ></IonIcon>
                </IonCol> */}
            <IonCol size="2" className="login-button">
              {currentUser ? (
                <IonItem className="item-color-dark">
                  <IonThumbnail slot="start">
                    <img
                      src={
                        currentUser?.data.photoURL
                          ? currentUser?.data.photoURL
                          : "https://ionicframework.com/docs/img/demos/thumbnail.svg"
                      }
                    />
                  </IonThumbnail>
                  <span className="hide-element">
                    Hello, {currentUser?.data.fname}
                  </span>
                  <IonButtons slot="end" className="hide-element">
                    <IonButton onClick={() => setShowLogoutModal(true)}>
                      <IonIcon icon={power} slot="end"></IonIcon>
                    </IonButton>
                  </IonButtons>
                </IonItem>
              ) : (
                <IonButton
                  // className="nav-login-signup-button"

                  onClick={() => history.push("/participant/signin")}
                >
                  Login/Signup
                </IonButton>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
      <LogoutModal isOpen={showLogoutModal} onClose={handleModalClose} />
    </IonHeader>
  );
};

export default Header;

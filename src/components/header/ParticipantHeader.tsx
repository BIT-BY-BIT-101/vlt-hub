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
  IonList,
} from "@ionic/react";
import { search, power } from "ionicons/icons";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LogoutModal from "../modals/LogoutModal";
import { AuthContext } from "../../context/AuthContext";

const ParticipantHeader = () => {
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
    const searchQuery = event.detail.value;
    setSearchText(searchQuery);

    // Update the URL with the search query parameter
    if (searchQuery) {
      history.push(
        `/participant/search?query=${encodeURIComponent(searchQuery)}`
      );
    }
  };
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
            <IonCol size="auto">
              <IonSearchbar
                className="navsearch-bar"
                placeholder="Search events"
                onIonChange={handleSearchChange}
              ></IonSearchbar>
              <IonIcon icon={search} className="search-icon"></IonIcon>
            </IonCol>
            {currentUser ? (
              <IonCol size="auto" className="header-link-host-event">
                <Link to="/host/signin" className="header-link">
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
            <IonCol size="auto" className="header-link-my-events">
              <Link to="/participant/events" className="header-link">
                My Learning
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
                <IonList className="item-bg-none">
                  <IonItem
                    lines="none"
                    color={"none"}
                    // className="item-color-dark"
                    // routerLink="/participant/profile"
                  >
                    <IonThumbnail
                      slot="start"
                      onClick={() => history.push("/participant/profile")}
                    >
                      <img
                        src={
                          currentUser?.data.photoURL
                            ? currentUser?.data.photoURL
                            : "https://ionicframework.com/docs/img/demos/thumbnail.svg"
                        }
                      />
                    </IonThumbnail>
                    <span className="hide-element">
                      Hello,{" "}
                      <span className="text-color-rgb">
                        {currentUser?.data.fname}
                      </span>
                    </span>
                    {/* <IonButtons slot="end" className="hide-element"> */}
                    <IonButton
                      fill="clear"
                      slot="end"
                      onClick={() => setShowLogoutModal(true)}
                    >
                      <IonIcon icon={power} slot="icon-only"></IonIcon>
                    </IonButton>
                    {/* </IonButtons> */}
                  </IonItem>
                </IonList>
              ) : (
                <IonButton className="nav-login-signup-button" href="">
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

export default ParticipantHeader;

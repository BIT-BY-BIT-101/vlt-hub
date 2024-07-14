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
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LogoutModal from "../modals/LogoutModal";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleClick = () => {
    window.location.href = "/participant/home";
  };

  const handleModalClose = () => {
    setShowLogoutModal(false);
  };
  const handleSearchChange = (event: CustomEvent) => {
    setSearchText(event.detail.value);
  };

  console.log(currentUser);

  if (currentUser?.data.role === "participant") {
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
                    Host an event
                  </Link>
                </IonCol>
              ) : (
                <IonCol size="auto" className="header-link-host-event">
                  <Link to="/host/signin" className="header-link">
                    Host an event
                  </Link>
                </IonCol>
              )}
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
                      Hello,{" "}
                      <span className="text-color-rgb">
                        {currentUser?.data.fname}
                      </span>
                    </span>
                    <IonButtons slot="end" className="hide-element">
                      <IonButton onClick={() => setShowLogoutModal(true)}>
                        <IonIcon icon={power} slot="end"></IonIcon>
                      </IonButton>
                    </IonButtons>
                  </IonItem>
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
  }

  if (currentUser?.data.role === "host") {
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
              {!(currentUser.data.role === "host") ? (
                <IonCol size="auto" className="header-link-host-event">
                  <Link to="/host/signin" className="header-link">
                    Host an event
                  </Link>
                </IonCol>
              ) : (
                <IonCol size="auto" className="header-link-host-event">
                  <Link to="/host/signin" className="header-link">
                    Host an event
                  </Link>
                </IonCol>
              )}
              <IonCol size="auto" className="header-link-my-events">
                <Link to="/host/event" className="header-link">
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
                      Hello,{" "}
                      <span className="text-color-rgb">
                        {currentUser?.data.fname}
                      </span>
                    </span>
                    <IonButtons slot="end" className="hide-element">
                      <IonButton onClick={() => setShowLogoutModal(true)}>
                        <IonIcon icon={power} slot="end"></IonIcon>
                      </IonButton>
                    </IonButtons>
                  </IonItem>
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
  }

  if (currentUser?.data.role === "venue") {
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
                  <IonTitle className="title-with-logo ">V.L.T. Hub</IonTitle>
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
                    Host an event
                  </Link>
                </IonCol>
              ) : (
                <IonCol size="auto" className="header-link-host-event">
                  <Link to="/host/signin" className="header-link">
                    Host an event
                  </Link>
                </IonCol>
              )}
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
                      Hello,{" "}
                      <span className="text-color-rgb">
                        {currentUser?.data.fname}
                      </span>
                    </span>
                    <IonButtons slot="end" className="hide-element">
                      <IonButton onClick={() => setShowLogoutModal(true)}>
                        <IonIcon icon={power} slot="end"></IonIcon>
                      </IonButton>
                    </IonButtons>
                  </IonItem>
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
                  Host an event
                </Link>
              </IonCol>
            ) : (
              <IonCol size="auto" className="header-link-host-event">
                <Link to="/host/signin" className="header-link">
                  Host an event
                </Link>
              </IonCol>
            )}
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

export default Header;

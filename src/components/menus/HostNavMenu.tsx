import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonToolbar,
} from "@ionic/react";
import {
  calendar,
  create,
  home,
  logIn,
  logOut,
  pencil,
  time,
} from "ionicons/icons";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import HostImg from "../../assets/host.jpg";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import LogoutModal from "../modals/LogoutModal";
import MenuHeader from "../header/MenuHeader";
import { auth } from "../../config/firebase";

function HostNavMenu() {
  const { signOut, userData } = useFirebaseAuth();
  const history = useHistory();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isMenuItemActive = (path: string) => {
    return location.pathname === path;
  };

  const handleModalClose = () => {
    setShowLogoutModal(false);
  };

  const items = [
    {
      title: "Home",
      path: "/host/home",
      icon: home,
    },
    {
      title: "Create",
      path: "/host/event-list",
      icon: calendar,
    },
    {
      title: "My Events",
      path: "/host/event",
      icon: time,
    },
    {
      title: "History",
      path: "/host/history",
      icon: time,
    },
  ];

  return (
    <IonMenu contentId="main" type="overlay">
      <MenuHeader />
      <IonContent>
        {auth.currentUser ? (
          <>
            <IonList className="flex-item bg-color-secondary">
              {items.map((item) => (
                <IonItem
                  key={item.title}
                  routerLink={item.path}
                  className={`item-color ${
                    isMenuItemActive(item.path) ? "activated" : ""
                  }`}
                  // onClick={() => history.push("/participant/home")}
                >
                  <IonIcon
                    icon={item.icon}
                    slot="start"
                    className="item-color"
                  />
                  <IonLabel>{item.title}</IonLabel>
                </IonItem>
              ))}
            </IonList>
            <IonList className="flex-item bg-color-secondary">
              <IonItem
                className="item-color"
                onClick={() => setShowLogoutModal(true)}
              >
                <IonIcon icon={logOut} slot="start" className="item-color" />
                <IonLabel>Logout</IonLabel>
              </IonItem>
            </IonList>
          </>
        ) : (
          <IonList className="flex-item bg-color-secondary">
            <IonItem
              className="item-color"
              routerLink="/host/signin"
              // onClick={() => setShowLogoutModal(true)}
            >
              <IonIcon icon={logIn} slot="start" className="item-color" />
              <IonLabel>Signin</IonLabel>
            </IonItem>
          </IonList>
        )}
        <LogoutModal isOpen={showLogoutModal} onClose={handleModalClose} />
      </IonContent>
    </IonMenu>
  );
}

export default HostNavMenu;

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
  IonMenuButton,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { calendar, home, logIn, logOut, pencil, time } from "ionicons/icons";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import UserImg from "../../assets/user.jpg";
import { auth } from "../../config/firebase";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import useFirestore from "../../hooks/useFirestore";
import LogoutModal from "../modals/LogoutModal";
import MenuHeader from "../header/MenuHeader";

function ParticipantNavMenu() {
  const { signOut, userData } = useFirebaseAuth();
  const history = useHistory();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleModalClose = () => {
    setShowLogoutModal(false);
  };

  const isMenuItemActive = (path: string) => {
    return location.pathname === path;
  };

  const items = [
    {
      title: "Home",
      path: "/participant/home",
      icon: home,
    },
    {
      title: "My Event",
      path: "/participant/events",
      icon: calendar,
    },
    {
      title: "History",
      path: "/participant/history",
      icon: time,
    },
  ];

  return (
    <IonMenu contentId="phome-main" type="overlay">
      <MenuHeader />
      <IonContent className="container-space-between" fullscreen={true}>
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
                    className="item-color-dark"
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
                <IonIcon
                  icon={logOut}
                  slot="start"
                  className="item-color-dark"
                />
                <IonLabel>Logout</IonLabel>
              </IonItem>
            </IonList>
          </>
        ) : (
          <IonList className="flex-item bg-color-secondary">
            <IonItem
              className="item-color"
              routerLink="/participant/signin"
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

export default ParticipantNavMenu;

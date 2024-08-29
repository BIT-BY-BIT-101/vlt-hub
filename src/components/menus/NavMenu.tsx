import {
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { logOut, logIn, calendar, home, time } from "ionicons/icons";
import React from "react";
import { auth } from "../../config/firebase";
import MenuHeader from "../header/MenuHeader";
import LogoutModal from "../modals/LogoutModal";

const NavMenu = () => {
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
    <IonMenu contentId="main" type="overlay">
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
};

export default NavMenu;

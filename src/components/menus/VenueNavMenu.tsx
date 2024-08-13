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
  alertCircle,
  book,
  business,
  home,
  logIn,
  logOut,
  pencil,
  time,
} from "ionicons/icons";
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import VenueOrgImg from "../../assets/venueorg.jpg";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import LogoutModal from "../modals/LogoutModal";
import MenuHeader from "../header/MenuHeader";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../config/firebase";

function VenueNavMenu() {
  const { currentUser } = useContext(AuthContext);
  const { signOut, userData } = useFirebaseAuth();
  const history = useHistory();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Logout clicked");
      // history.push("/venue/signin");
    } catch (error) {}
  };

  const isMenuItemActive = (path: string) => {
    return location.pathname === path;
  };

  const handleModalClose = () => {
    setShowLogoutModal(false);
  };

  const items = [
    {
      title: "Home",
      path: "/venue/home",
      icon: home,
    },
    {
      title: "Facilities",
      path: "/venue/list-venue",
      icon: business,
    },
    {
      title: "Requests",
      path: "/venue/requests",
      icon: alertCircle,
    },
    {
      title: "Booked Events",
      path: "/venue/booked-events",
      icon: book,
    },
    // {
    //   title: "History",
    //   path: "/venue/history",
    //   icon: time,
    // },
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
      <LogoutModal isOpen={showLogoutModal} onClose={handleModalClose} />
    </IonMenu>
  );
}

export default VenueNavMenu;

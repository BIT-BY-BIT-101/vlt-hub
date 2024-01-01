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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { calendar, home, logOut, pencil, time } from "ionicons/icons";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import UserImg from "../../assets/user.jpg";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import LogoutModal from "../modals/LogoutModal";
import useFirestore from "../../hooks/useFirestore";

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

  return (
    <IonMenu contentId="phome-main" type="overlay">
      <IonHeader>
        <IonToolbar class="phome-menu-header">
          <IonImg
            src={UserImg}
            alt="V.L.T. Hub"
            className="phome-logocontainer"
          />
          <div className="phome-userinfo">
            <IonLabel class="phome-username">
              {userData?.fname} {userData?.lname}
            </IonLabel>
            <IonButtons>
              <IonButton
                className="phome-editprofile"
                onClick={() => history.push("/participant/profile")}
              >
                <IonIcon icon={pencil} />
                My Profile
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="phome-menu-content">
        <IonList className="phome-menu-options">
          <IonItem
            routerLink="/participant/home"
            className={`phome-menu-item ${
              isMenuItemActive("/participant/home") ? "activated" : ""
            }`}
            // onClick={() => history.push("/participant/home")}
          >
            <IonIcon icon={home} slot="start" className="phome-menu-icon" />
            <IonLabel class="phome-menu-label">Home</IonLabel>
          </IonItem>
          <IonItem
            routerLink="/participant/event"
            className={`phome-menu-item ${
              isMenuItemActive("/participant/event") ? "activated" : ""
            }`}
            // onClick={() => history.push("/participant/event")}
          >
            <IonIcon icon={calendar} slot="start" className="phome-menu-icon" />
            <IonLabel class="phome-menu-label">My Events</IonLabel>
          </IonItem>
          <IonItem
            routerLink="/participant/history"
            className={`phome-menu-item ${
              isMenuItemActive("/participant/history") ? "activated" : ""
            }`}
            // onClick={() => history.push("/participant/history")}
          >
            <IonIcon icon={time} slot="start" className="phome-menu-icon" />
            <IonLabel class="phome-menu-label">History</IonLabel>
          </IonItem>
        </IonList>
        <IonItem
          className="phome-menu-item phome-logout"
          onClick={() => setShowLogoutModal(true)}
        >
          <IonIcon icon={logOut} slot="start" className="phome-menu-icon" />
          <IonLabel class="phome-menu-label">Logout</IonLabel>
        </IonItem>
        <LogoutModal isOpen={showLogoutModal} onClose={handleModalClose} />
      </IonContent>
    </IonMenu>
  );
}

export default ParticipantNavMenu;

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
import { calendar, create, home, logOut, pencil, time } from "ionicons/icons";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import HostImg from "../../assets/host.jpg";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import LogoutModal from "../modals/LogoutModal";

function HostNavMenu() {
  const { signOut, userData } = useFirebaseAuth();
  const history = useHistory();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // const handleSignOut = async () => {
  //   try {
  //     await signOut();
  //     console.log("Logout clicked");
  //     // history.push("/host/signin");
  //   } catch (error) {
  //     console.log("logout Faild:", error);
  //   }
  // };

  const isMenuItemActive = (path: string) => {
    return location.pathname === path;
  };

  const handleModalClose = () => {
    setShowLogoutModal(false);
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar class="hhome-menu-header">
          <IonImg
            src={HostImg}
            alt="V.L.T. Hub"
            className="hhome-logocontainer"
          />
          <div className="hhome-userinfo">
            <IonLabel class="hhome-username">
              {userData?.fname} {userData?.lname}
            </IonLabel>
            <IonButtons>
              <IonButton
                className="hhome-editprofile"
                // onClick={() => history.push("/host/profile")}
                routerLink="/host/profile"
              >
                <IonIcon icon={pencil} />
                My Profile
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="hhome-menu-content">
        <IonList className="hhome-menu-options">
          <IonItem
            className={`hhome-menu-item ${
              isMenuItemActive("/host/home") ? "activated" : ""
            }`}
            onClick={() => history.push("/host/home")}
          >
            <IonIcon icon={home} slot="start" className="hhome-menu-icon" />
            <IonLabel class="hhome-menu-label">Home</IonLabel>
          </IonItem>
          <IonItem
            className={`hhome-menu-item ${
              isMenuItemActive("/host/event-list") ? "activated" : ""
            }`}
            onClick={() => history.push("/host/event-list")}
          >
            <IonIcon icon={home} slot="start" className="hhome-menu-icon" />
            <IonLabel class="hhome-menu-label">Create</IonLabel>
          </IonItem>
          <IonItem
            className={`hhome-menu-item ${
              isMenuItemActive("/host/event") ? "activated" : ""
            }`}
            onClick={() => history.push("/host/event")}
          >
            <IonIcon icon={calendar} slot="start" className="hhome-menu-icon" />
            <IonLabel class="hhome-menu-label">My Events</IonLabel>
          </IonItem>
          <IonItem
            className={`hhome-menu-item ${
              isMenuItemActive("/host/history") ? "activated" : ""
            }`}
            onClick={() => history.push("/host/history")}
          >
            <IonIcon icon={time} slot="start" className="hhome-menu-icon" />
            <IonLabel class="hhome-menu-label">History</IonLabel>
          </IonItem>
        </IonList>
        <IonItem
          className="hhome-menu-item hhome-logout"
          onClick={() => setShowLogoutModal(true)}
        >
          <IonIcon icon={logOut} slot="start" className="hhome-menu-icon" />
          <IonLabel class="hhome-menu-label">Logout</IonLabel>
        </IonItem>
      </IonContent>
      <LogoutModal isOpen={showLogoutModal} onClose={handleModalClose} />
    </IonMenu>
  );
}

export default HostNavMenu;

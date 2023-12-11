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
import { alertCircle, book, home, logOut, pencil, time } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import VenueOrgImg from "../../assets/venueorg.jpg";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import LogoutModal from "../modals/LogoutModal";

function VenueNavMenu() {
  const { signOut } = useFirebaseAuth();
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

  return (
    <IonMenu contentId="vhome-main" type="overlay">
      <IonHeader>
        <IonToolbar class="vhome-menu-header">
          <IonImg
            src={VenueOrgImg}
            alt="V.L.T. Hub"
            className="vhome-logocontainer"
            onClick={() => history.push("/venue/profile")}
          />
          <div className="vhome-userinfo">
            <IonLabel class="vhome-username">SMX Olongapo</IonLabel>
            <IonButtons>
              <IonButton className="vhome-editprofile">
                <IonIcon icon={pencil} />
                Edit My Profile
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="vhome-menu-content">
        <IonList className="vhome-menu-options">
          <IonItem
            className={`vhome-menu-item ${
              isMenuItemActive("/venue/home") ? "activated" : ""
            }`}
            onClick={() => history.push("/venue/home")}
          >
            <IonIcon icon={home} slot="start" className="vhome-menu-icon" />
            <IonLabel class="vhome-menu-label">Home</IonLabel>
          </IonItem>

          <IonItem
            className={`vhome-menu-item ${
              isMenuItemActive("/venue/requests") ? "activated" : ""
            }`}
            onClick={() => history.push("/venue/requests")}
          >
            <IonIcon
              icon={alertCircle}
              slot="start"
              className="vhome-menu-icon"
            />
            <IonLabel class="vhome-menu-label">Requests</IonLabel>
          </IonItem>

          <IonItem
            className={`vhome-menu-item ${
              isMenuItemActive("/venue/booked-events") ? "activated" : ""
            }`}
            onClick={() => history.push("/venue/booked-events")}
          >
            <IonIcon icon={book} slot="start" className="vhome-menu-icon" />
            <IonLabel class="vhome-menu-label">Booked Events</IonLabel>
          </IonItem>

          <IonItem
            className={`vhome-menu-item ${
              isMenuItemActive("/venue/history") ? "activated" : ""
            }`}
            onClick={() => history.push("/venue/history")}
          >
            <IonIcon icon={time} slot="start" className="vhome-menu-icon" />
            <IonLabel class="vhome-menu-label">History</IonLabel>
          </IonItem>
        </IonList>

        <IonItem
          className="vhome-menu-item vhome-logout"
          onClick={() => setShowLogoutModal(true)}
        >
          <IonIcon icon={logOut} slot="start" className="vhome-menu-icon" />
          <IonLabel class="vhome-menu-label">Logout</IonLabel>
        </IonItem>
      </IonContent>
      <LogoutModal isOpen={showLogoutModal} onClose={handleModalClose} />
    </IonMenu>
  );
}

export default VenueNavMenu;

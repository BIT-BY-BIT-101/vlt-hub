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
import { calendar, home, logOut, pencil, time } from "ionicons/icons";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserImg from "../../assets/user.jpg";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

function ParticipantNavMenu() {
  const { signOut } = useFirebaseAuth();
  const history = useHistory();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Logout clicked");
      // history.push("/participant/signin");
    } catch (error) {}
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
            <IonLabel class="phome-username">Treisha Mae Monteza</IonLabel>
            <IonButtons>
              <IonButton className="phome-editprofile">
                <IonIcon icon={pencil} />
                Edit My Profile
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="phome-menu-content">
        <IonList className="phome-menu-options">
          <IonItem
            className={`phome-menu-item ${
              isMenuItemActive("/participant/home") ? "activated" : ""
            }`}
            onClick={() => history.push("/participant/home")}
          >
            <IonIcon icon={home} slot="start" className="phome-menu-icon" />
            <IonLabel class="phome-menu-label">Home</IonLabel>
          </IonItem>
          <IonItem
            className={`phome-menu-item ${
              isMenuItemActive("/participant/event") ? "activated" : ""
            }`}
            onClick={() => history.push("/participant/event")}
          >
            <IonIcon icon={calendar} slot="start" className="phome-menu-icon" />
            <IonLabel class="phome-menu-label">My Events</IonLabel>
          </IonItem>
          <IonItem
            className={`phome-menu-item ${
              isMenuItemActive("/participant/history") ? "activated" : ""
            }`}
            onClick={() => history.push("/participant/history")}
          >
            <IonIcon icon={time} slot="start" className="phome-menu-icon" />
            <IonLabel class="phome-menu-label">History</IonLabel>
          </IonItem>
        </IonList>
        <IonItem
          className="phome-menu-item phome-logout"
          onClick={handleSignOut}
        >
          <IonIcon icon={logOut} slot="start" className="phome-menu-icon" />
          <IonLabel class="phome-menu-label">Logout</IonLabel>
        </IonItem>
      </IonContent>
    </IonMenu>
  );
}

export default ParticipantNavMenu;
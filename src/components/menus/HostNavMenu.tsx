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
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import HostImg from "../../assets/host.jpg";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

function HostNavMenu() {
  const { signOut } = useFirebaseAuth();
  const history = useHistory();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Logout clicked");
      // history.push("/host/signin");
    } catch (error) {}
  };

  const isMenuItemActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <IonMenu contentId="hhome-main" type="overlay">
      <IonHeader>
        <IonToolbar class="hhome-menu-header">
          <IonImg
            src={HostImg}
            alt="V.L.T. Hub"
            className="hhome-logocontainer"
          />
          <div className="hhome-userinfo">
            <IonLabel class="hhome-username">Abdul Rauf M. Sultan</IonLabel>
            <IonButtons>
              <IonButton className="hhome-editprofile">
                <IonIcon icon={pencil} />
                Edit My Profile
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
              isMenuItemActive("/host/create") ? "activated" : ""
            }`}
            onClick={() => history.push("/host/create")}
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
          onClick={handleSignOut}
        >
          <IonIcon icon={logOut} slot="start" className="hhome-menu-icon" />
          <IonLabel class="hhome-menu-label">Logout</IonLabel>
        </IonItem>
      </IonContent>
    </IonMenu>
  );
}

export default HostNavMenu;

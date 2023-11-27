import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonImg,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonList,
  IonItem,
} from "@ionic/react";
import { pencil, home, calendar, time, logOut } from "ionicons/icons";
import React from "react";
import UserImg from "../../assets/user.jpg";

function NaveMenu() {
  const handleLogout = () => {
    console.log("Logout clicked");
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
        <IonList>
          <IonItem className="phome-menu-item">
            <IonIcon icon={home} slot="start" className="phome-menu-icon" />
            <IonLabel class="phome-menu-label">Home</IonLabel>
          </IonItem>
          <IonItem className="phome-menu-item">
            <IonIcon icon={calendar} slot="start" className="phome-menu-icon" />
            <IonLabel class="phome-menu-label">My Events</IonLabel>
          </IonItem>
          <IonItem className="phome-menu-item">
            <IonIcon icon={time} slot="start" className="phome-menu-icon" />
            <IonLabel class="phome-menu-label">History</IonLabel>
          </IonItem>
        </IonList>
        <IonItem
          className="phome-menu-item phome-logout"
          onClick={handleLogout}
        >
          <IonIcon icon={logOut} slot="start" className="phome-menu-icon" />
          <IonLabel class="phome-menu-label">Logout</IonLabel>
        </IonItem>
      </IonContent>
    </IonMenu>
  );
}

export default NaveMenu;

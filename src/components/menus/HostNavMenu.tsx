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
import HostImg from "../../assets/host.jpg";

function HostNavMenu() {
  const handleLogout = () => {
    console.log("Logout clicked");
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
        <IonList>
          <IonItem className="hhome-menu-item">
            <IonIcon icon={home} slot="start" className="hhome-menu-icon" />
            <IonLabel class="hhome-menu-label">Home</IonLabel>
          </IonItem>
          <IonItem className="hhome-menu-item">
            <IonIcon icon={create} slot="start" className="hhome-menu-icon" />
            <IonLabel class="hhome-menu-label">Create</IonLabel>
          </IonItem>
          <IonItem className="hhome-menu-item">
            <IonIcon icon={calendar} slot="start" className="hhome-menu-icon" />
            <IonLabel class="hhome-menu-label">My Events</IonLabel>
          </IonItem>
          <IonItem className="hhome-menu-item">
            <IonIcon icon={time} slot="start" className="hhome-menu-icon" />
            <IonLabel class="hhome-menu-label">History</IonLabel>
          </IonItem>
        </IonList>
        <IonItem
          className="hhome-menu-item hhome-logout"
          onClick={handleLogout}
        >
          <IonIcon icon={logOut} slot="start" className="hhome-menu-icon" />
          <IonLabel class="hhome-menu-label">Logout</IonLabel>
        </IonItem>
      </IonContent>
    </IonMenu>
  );
}

export default HostNavMenu;

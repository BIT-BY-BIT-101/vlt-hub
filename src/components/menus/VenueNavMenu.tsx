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
import React from "react";
import VenueOrgImg from "../../assets/venueorg.jpg";

function VenueNavMenu() {
  const handleLogout = () => {
    console.log("Logout clicked");
  };
  return (
    <IonMenu contentId="vhome-main" type="overlay">
      <IonHeader>
        <IonToolbar class="hhome-menu-header">
          <IonImg
            src={VenueOrgImg}
            alt="V.L.T. Hub"
            className="vhome-logocontainer"
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
        <IonList>
          <IonItem className="vhome-menu-item">
            <IonIcon icon={home} slot="start" className="vhome-menu-icon" />
            <IonLabel class="vhome-menu-label">Home</IonLabel>
          </IonItem>
          <IonItem className="vhome-menu-item">
            <IonIcon
              icon={alertCircle}
              slot="start"
              className="vhome-menu-icon"
            />
            <IonLabel class="vhome-menu-label">Requests</IonLabel>
          </IonItem>
          <IonItem className="vhome-menu-item">
            <IonIcon icon={book} slot="start" className="vhome-menu-icon" />
            <IonLabel class="vhome-menu-label">Booked Events</IonLabel>
          </IonItem>
          <IonItem className="vhome-menu-item">
            <IonIcon icon={time} slot="start" className="vhome-menu-icon" />
            <IonLabel class="vhome-menu-label">History</IonLabel>
          </IonItem>
        </IonList>
        <IonItem
          className="vhome-menu-item vhome-logout"
          onClick={handleLogout}
        >
          <IonIcon icon={logOut} slot="start" className="vhome-menu-icon" />
          <IonLabel class="vhome-menu-label">Logout</IonLabel>
        </IonItem>
      </IonContent>
    </IonMenu>
  );
}

export default VenueNavMenu;

import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import VenueCard from "../../components/cards/VenueCard";
import VenueNavMenu from "../../components/menus/VenueNavMenu";
import "./../../components/cards/VenueCard.css";
import "./VenueListPage.css";

const VenueListPage = () => {
  return (
    <>
      <VenueNavMenu />
      <IonPage id="main">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>

            <IonTitle>Venues</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonButton className="vlistpage-btn" routerLink="/venue/add-venue">
            Add Venue
          </IonButton>
          <VenueCard />
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueListPage;

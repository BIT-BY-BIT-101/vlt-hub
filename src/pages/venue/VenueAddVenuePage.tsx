import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import AddVenue from "../../components/forms/AddVenue";
import "./../../components/forms/AddVenue.css";

const VenueAddVenuePage = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={history.goBack}>Back</IonButton>
          </IonButtons>
          <IonTitle slot="end">Add Venue</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AddVenue />
      </IonContent>
    </IonPage>
  );
};

export default VenueAddVenuePage;

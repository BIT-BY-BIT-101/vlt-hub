import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import React from "react";
import HostNavMenu from "../../components/menus/HostNavMenu";
import { useHistory } from "react-router";
import VenueCard from "../../components/cards/VenueCard";
import VenueSelectionCard from "../../components/cards/VenueSelectionCard";

const HostVenueSelectionPage = () => {
  const history = useHistory();
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            {/* <IonMenuButton autoHide={false} slot="start" /> */}
            <IonButtons slot="start">
              <IonButton onClick={history.goBack}>Back</IonButton>
            </IonButtons>
            <IonTitle>Select Venue</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="main">
          <div className="hhome-form-container">
            <VenueSelectionCard />
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostVenueSelectionPage;

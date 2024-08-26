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
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import React from "react";
import HostNavMenu from "../../components/menus/HostNavMenu";
import { useHistory } from "react-router";
import VenueCard from "../../components/venue/VenueCard";
import VenueSelectionCard from "../../components/venue/VenueSelectionCard";
import Header from "../../components/header/Header";
import CreateEvent from "../../components/host/CreateEvent";
import SidePanel from "../../components/SidePanel";
import Menus from "../../components/menus/Menus";

const HostVenueSelectionPage = () => {
  const history = useHistory();
  return (
    <>
      <Menus />
      <IonPage id="main">
        <Header />
        {/* <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={history.goBack}>Back</IonButton>
            </IonButtons>
            <IonTitle>Select Venue</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <IonContent>
          <IonGrid>
            <IonRow>
              <SidePanel />
              <IonCol>
                <VenueSelectionCard />
              </IonCol>
            </IonRow>
          </IonGrid>
          {/* <div className="hhome-form-container">
            <VenueSelectionCard />
          </div> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostVenueSelectionPage;

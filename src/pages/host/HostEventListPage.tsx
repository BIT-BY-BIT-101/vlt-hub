import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/react";
import React from "react";
import CreateEvent from "../../components/forms/CreateEvent";
import HostNavMenu from "../../components/menus/HostNavMenu";
import { UnpubEventCard } from "../../components/cards/UnpubEventCard";

const HostEventListPage = () => {
  return (
    <>
      <HostNavMenu />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonMenuButton autoHide={false} slot="start" />
            <IonTitle>List of Events</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="main">
          <IonButton routerLink={`/host/venue-list`}>Create Event</IonButton>
          {/* <div className="hhome-form-container">
            <CreateEvent />
          </div> */}
          <UnpubEventCard />
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostEventListPage;

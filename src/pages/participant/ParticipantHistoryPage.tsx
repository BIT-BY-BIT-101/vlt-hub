import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import ParticipantNavMenu from "../../components/menus/ParticipantNavMenu";
import "./ParticipantHistoryPage.css";

const ParticipantHistoryPage = () => {
  return (
    <IonPage>
      <ParticipantNavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="phome-main">
        <IonCard>
          {/* <IonCardHeader>
            <IonTitle className="table-title">History</IonTitle>
          </IonCardHeader> */}
          <IonCardContent>
            <IonGrid>
              <IonRow className="table-header">
                <IonCol className="header-cell">Event Name</IonCol>
                <IonCol className="header-cell">Date</IonCol>
                <IonCol className="header-cell">Host</IonCol>
                <IonCol className="header-cell">Status</IonCol>
                <IonCol className="header-cell">Venue</IonCol>
              </IonRow>
              <IonRow className="content-row">
                <IonCol className="content-cell">
                  Meta Safety in the Modern Age - Strategies for a Secure
                  Digital Journey
                </IonCol>
                <IonCol className="content-cell">November 29, 2023</IonCol>
                <IonCol className="content-cell">Mr. Allan A. Custodio</IonCol>
                <IonCol className="content-cell">Zoom</IonCol>
                <IonCol className="content-cell-status">Attended</IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ParticipantHistoryPage;
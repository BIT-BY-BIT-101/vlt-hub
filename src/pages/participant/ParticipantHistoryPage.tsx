import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useState } from "react";
import HostImg from "../../assets/host.jpg";
import IntrotoCSharp from "../../assets/introtocsharp.jpg";
import MetaSafety from "../../assets/metasafety.jpg";
import techythursdays from "../../assets/techythursdays.jpg";
import ParticipantNavMenu from "../../components/menus/ParticipantNavMenu";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import "./ParticipantHistoryPage.css";

const ParticipantHistoryPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSearchInputChange = (e: CustomEvent) => {
    setSearchText(e.detail.value);
  };

  return (
    <>
      <ParticipantNavMenu />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>
            {/* <IonMenuButton slot="start" /> */}
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
                  <IonCol className="content-cell">
                    Mr. Allan A. Custodio
                  </IonCol>
                  <IonCol className="content-cell">Zoom</IonCol>
                  <IonCol className="content-cell-status">Attended</IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ParticipantHistoryPage;

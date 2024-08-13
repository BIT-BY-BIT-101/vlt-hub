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
import ParticipantHeader from "../../components/participant/ParticipantHeader";
import ParticipantSidePane from "../../components/participant/ParticipantSidePane";
import HistoryCard from "../../components/participant/HistoryCard";
import Header from "../../components/header/Header";
import SidePanel from "../../components/SidePanel";

const ParticipantHistoryPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      {/* <ParticipantNavMenu /> */}
      <IonPage>
        {/* <ParticipantHeader /> */}
        <Header />

        <IonContent id="phome-main">
          {/* <IonSearchbar
            className="phistory-searchbar"
            value={searchText}
            onIonChange={handleSearchInputChange}
            placeholder="Search events..."
          /> */}
          <IonGrid>
            <IonRow>
              {/* <ParticipantSidePane /> */}
              <SidePanel />
              <IonCol size="10">
                <IonRow>
                  <HistoryCard />
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ParticipantHistoryPage;

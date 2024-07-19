import {
  IonButton,
  IonButtons,
  IonCard,
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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useState } from "react";
import HostImg from "../../assets/host.jpg";
import IntrotoCSharp from "../../assets/introtocsharp.jpg";
import MetaSafety from "../../assets/metasafety.jpg";
import techythursdays from "../../assets/techythursdays.jpg";
import VenueNavMenu from "../../components/menus/VenueNavMenu";
import "./VenueRequestsPage.css";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import SidePanel from "../../components/SidePanel";

const VenueRequestsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      {/* <VenueNavMenu /> */}
      <Menus />
      <IonPage id="main">
        <Header />
        <IonContent id="main">
          <IonGrid>
            <IonRow>
              <SidePanel />
              <IonCol>
                <IonList className="bg-color-main ion-margin-top">
                  <IonItem className="item-color">
                    <IonIcon
                      icon={closeCircle}
                      slot="end"
                      className="text-color-dark cursor-pointer"
                    />
                    <IonLabel>Request 1</IonLabel>
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueRequestsPage;

import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { notificationsOutline, search } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";
import ParticipantSigninComponent from "../../../components/auth/participant/ParticipantSigninComponent";
import Header from "../../../components/header/Header";

export default function ParticipantSigninPage() {
  const handleClick = () => {
    window.location.href = "/participant/home";
  };
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen className="ion-padding">
        <ParticipantSigninComponent />
      </IonContent>
    </IonPage>
  );
}

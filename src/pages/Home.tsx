import React, { useState } from "react";
import {
  IonHeader,
  IonContent,
  IonButton,
  IonToolbar,
  IonTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import useFirebaseData from "../hooks/useFirestore";
import Forms from "../components/cards/Forms";

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Forms />
        {/* Additional features like editing and deleting data can be added as needed */}
      </IonContent>
    </IonPage>
  );
};
export default Home;

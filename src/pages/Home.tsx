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
import Forms from "../components/experiment/Forms";
import AuthButton from "../components/experiment/AuthButton";

const Home = () => {
  const path = "/signup";
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <AuthButton defaultpath={path} to={"/signup"} slots="start" />
          <AuthButton defaultpath={path} to={"/signin"} slots="end" />
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

import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
} from "@ionic/react";

const Unauthorized: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Unauthorized Access</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: "center", marginTop: "20%", color: "black" }}>
          <h1>Unauthorized</h1>
          <p>You do not have permission to view this page.</p>
          <IonButton routerLink="/home">Go back</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Unauthorized;

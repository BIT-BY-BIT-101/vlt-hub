import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const PageNotFound: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Page Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          className="ion-padding ion-text-center"
          style={{ marginTop: "20%", color: "black" }}
        >
          <h2 className="ion-text-center" color="black">
            Page Not Found
          </h2>
          <p style={{ textAlign: "center" }}>
            The page you are looking for was not found. You can click the button
            below to go back to the home page.
          </p>
          <IonButton routerLink="/home">Go back</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PageNotFound;

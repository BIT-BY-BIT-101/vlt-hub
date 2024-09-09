import {
  IonButton,
  IonCol,
  IonContent,
  IonItem,
  IonRow,
  IonTitle,
} from "@ionic/react";
import React from "react";

const HomeComponent = () => {
  return (
    <IonCol size="auto" className="ion-margin-top">
      <IonRow>
        <IonTitle>
          <h1 className="ion-text-wrap ion-text-center">
            <strong
              style={{ color: "white", fontWeight: "bold", fontSize: "40px" }}
            >
              A software based solution for accommodating all your training and
              workshops
            </strong>
          </h1>
        </IonTitle>
      </IonRow>

      <IonRow className="ion-justify-content-center ion-margin-top">
        <IonButton
          color={"secondary"}
          className="ion-margin-top"
          size="large"
          shape="round"
        >
          {/* <h1 className="ion-padding">Get Started</h1> */}
          Get Started
        </IonButton>
      </IonRow>
    </IonCol>
  );
};

export default HomeComponent;

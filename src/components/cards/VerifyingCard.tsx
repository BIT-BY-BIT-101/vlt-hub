import {
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonItem,
  IonNavLink,
  IonRouterLink,
} from "@ionic/react";
import React from "react";

const VerifyingCard = () => {
  return (
    <IonCard className="card" style={{ width: "80%", maxWidth: "600px" }}>
      <IonCardTitle
        className="card-title"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Your Account is being verified
      </IonCardTitle>
      <IonCardContent style={{ textAlign: "center" }}>
        <p>
          Your Account is being verified by our team. You will be notified once
          the verification is complete.
        </p>

        <IonRouterLink
          routerLink="/host/event-list"
          style={{ textAlign: "center" }}
        >
          Return to Home Page
        </IonRouterLink>
      </IonCardContent>
    </IonCard>
  );
};

export default VerifyingCard;

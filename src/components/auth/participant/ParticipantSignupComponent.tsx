import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import React from "react";
import { Link } from "react-router-dom";

const ParticipantSignupComponent = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Signup</IonCardTitle>
        <IonCardSubtitle>subtitle</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput type="email" label="email" />
        </IonItem>
        <IonItem>
          <IonLabel>Password</IonLabel>
          <IonInput type="password" label="email" />
        </IonItem>
        <IonItem>
          <IonLabel>Re-type password</IonLabel>
          <IonInput type="password" label="email" />
        </IonItem>
        <IonItem>
          <IonText className="psignin-prompt">
            <p>
              Already have an Account? <Link to={"/signin"}>Sign-in!</Link>
            </p>
          </IonText>
        </IonItem>

        <IonItem>
          <IonButton>Sigun</IonButton>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default ParticipantSignupComponent;

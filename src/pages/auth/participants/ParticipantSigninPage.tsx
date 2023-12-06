import {
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import ParticipantSigninComponent from "../../../components/auth/participant/ParticipantSigninComponent";
import useFirebaseAuth from "../../../hooks/useFirebaseAuth";
import { Redirect } from "react-router";

export default function ParticipantSigninPage() {
  const { user, loading } = useFirebaseAuth();

  if (loading) {
    return <IonLoading isOpen={loading} message={"Please Wait"} />;
  }

  if (user) {
    return <Redirect to="/participant/home" />;
  }
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <ParticipantSigninComponent />
      </IonContent>
    </IonPage>
  );
}

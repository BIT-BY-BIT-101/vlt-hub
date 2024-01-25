import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
} from "@ionic/react";
import React from "react";

export const UnpubEventCard = () => {
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Event Name</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonItem>
            <strong>Date:</strong>
          </IonItem>
          <IonItem>
            <strong>Start Time:</strong>
          </IonItem>
          <IonItem>
            <strong>End Time:</strong>
          </IonItem>
        </IonCardContent>
      </IonCard>
    </>
  );
};

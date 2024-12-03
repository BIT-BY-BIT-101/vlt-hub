import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonCol,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import { EventDataModel } from "../../models/Model";

const HostDashboard = () => {
  const [events, setEvents] = useState<EventDataModel[]>([]);
  const [participants, setParticipants] = useState<number>(0);

  useEffect(() => {
    const q = query(collection(db, "events"));
    onSnapshot(q, (querySnapshot) => {
      const eventsList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEvents(eventsList);
      const totalParticipants = eventsList.reduce(
        (total, event) => total + event.participants.length,
        0
      );
      setParticipants(totalParticipants);
    });
  }, []);

  return (
    <>
      <IonCol>
        <IonCard className="ion-text-center">
          <IonCardContent>
            <IonText>
              <p>Number of Events: {events.length}</p>
              <p>Number of Participants: {participants}</p>
            </IonText>
            <IonCardHeader>
              <IonCardTitle>Dashboard</IonCardTitle>
            </IonCardHeader>
          </IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol>
        <IonCard className="ion-text-center">
          <IonCardContent>
            <IonText>
              <p>Number of Events: {events.length}</p>
              <p>Number of Participants: {participants}</p>
            </IonText>
            <IonCardHeader>
              <IonCardTitle>Dashboard</IonCardTitle>
            </IonCardHeader>
          </IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol>
        <IonCard className="ion-text-center">
          <IonCardContent>
            <IonText>
              <p>Number of Events: {events.length}</p>
              <p>Number of Participants: {participants}</p>
            </IonText>
            <IonCardHeader>
              <IonCardTitle>Dashboard</IonCardTitle>
            </IonCardHeader>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </>
  );
};

export default HostDashboard;

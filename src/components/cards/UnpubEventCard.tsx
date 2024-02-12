import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../../config/firebase";
import { EventDataModel } from "../../models/Model";
import useQuery from "../../hooks/useQuery";

export const UnpubEventCard = () => {
  const { data: events } = useQuery("events", "status", "==", "unpublished");
  console.log(events);

  return (
    <>
      {events?.length === 0 ? (
        <IonCard>
          <IonCardContent>
            <IonLabel>No unpublished events available</IonLabel>
          </IonCardContent>
        </IonCard>
      ) : (
        events.map((event: EventDataModel) => (
          <IonCard key={event.id}>
            <IonCardHeader>
              <IonCardTitle>
                <h1>{event.title}</h1>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <strong>
                  Venue: <p>{event.venue}</p>
                </strong>
              </IonItem>
              <IonItem>
                <strong>
                  Date: <p>{event.eventDate}</p>
                </strong>
              </IonItem>
              <IonItem>
                <strong>
                  Start Time: <p>{event.startTime}</p>
                </strong>
              </IonItem>
              <IonItem>
                <strong>
                  End Time: <p>{event.endTime}</p>
                </strong>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))
      )}
    </>
  );
};

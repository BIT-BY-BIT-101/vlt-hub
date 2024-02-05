import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
} from "@ionic/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../../config/firebase";
import { EventDataModel } from "../../models/Model";

export const UnpubEventCard = () => {
  console.log(events);

  return (
    <>
      {events.map((event: EventDataModel) => (
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
      ))}
    </>
  );
};

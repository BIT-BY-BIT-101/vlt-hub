import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import React from "react";
import useFirestore from "../../hooks/useFirestore";
import { VenueDataModel } from "../../models/Model";

const VenueCard = () => {
  const { data: venueData } = useFirestore("venues");
  return (
    <>
      {venueData &&
        venueData.map((venue: VenueDataModel) => (
          <IonCard key={venue.id}>
            <IonCardHeader>
              <IonCardTitle>{venue.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonLabel>Description</IonLabel>
                <IonItem>{venue.description}</IonItem>
              </IonList>
              <IonList>
                <IonLabel>Address</IonLabel>
                <IonItem>
                  {venue.bldg_no} {venue.street} {venue.city}
                </IonItem>
              </IonList>
              <IonList>
                <IonLabel>Maximum Capacity</IonLabel>
                <IonItem>{venue.maxCapacity}</IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        ))}
    </>
  );
};

export default VenueCard;

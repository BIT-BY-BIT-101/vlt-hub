import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonGrid,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import useFetchFacilityEvents from "../../hooks/useFetchFacilityEvents";
import {
  formatDateString,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
type RouteParams = {
  id: string;
};
const EventItem = () => {
  const { id } = useParams<RouteParams>();

  const { data: events, loading, error } = useFetchFacilityEvents(id);
  console.log(id);

  console.log(events);

  return (
    <>
      <IonItem className="item-bg-none">
        <IonButton routerLink={`/venue/add-event/${id}`} slot="end">
          <span>Add Event</span>
        </IonButton>
      </IonItem>
      {events.map((event) => (
        <IonCard className="card ion-padding" key={event.id}>
          <IonGrid>
            <IonRow>
              <IonCardTitle>
                <IonLabel className="card-label">
                  <span className="form-title">{event.title}</span>
                  <IonNote style={{ color: "var(--ion-color-primary)" }}>
                    by: {event.host_name}
                  </IonNote>
                </IonLabel>
              </IonCardTitle>
            </IonRow>
            <IonRow>
              <IonCardContent>
                <IonRow>
                  <IonLabel>
                    <strong className="form-title">Date: </strong>
                    <span className="form-label">
                      {formatDateString(event.date_from)}
                    </span>
                  </IonLabel>
                </IonRow>
                <IonRow>
                  <IonLabel>
                    <strong className="form-title">Time: </strong>
                    <span className="form-label">
                      {formatTimeString(event.start_time)}-
                      {formatTimeString(event.end_time)}
                    </span>
                  </IonLabel>
                </IonRow>
              </IonCardContent>
            </IonRow>
          </IonGrid>
        </IonCard>
      ))}
    </>
  );
};

export default EventItem;

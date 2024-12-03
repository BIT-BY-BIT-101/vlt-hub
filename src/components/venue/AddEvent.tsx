import {
  IonCard,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCardTitle,
  IonItem,
  IonCardContent,
  IonNote,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router-dom";
import useFetchApprovedEvents from "../../hooks/useFetchApprovedEvents";
import Loader from "../loaders/Loader";
import {
  formatDateString,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
import useFirestore from "../../hooks/useFirestore";
import useGetFacility from "../../hooks/useGetFacility";

type RouteParams = {
  id: string;
};

const AddEvent = () => {
  const { id } = useParams<RouteParams>();

  const facilityId = id;
  const {
    data: facility,
    loading: loadingFacility,
    error: facilityError,
  } = useGetFacility(facilityId);

  const {
    data: events,
    loading: eventsLoading,
    error: eventsError,
  } = useFetchApprovedEvents();
  const { updateData, loading, error } = useFirestore("events");

  if (eventsLoading) return <Loader />;

  console.log(events);

  const handleUpdate = async (id: string) => {
    // console.log(id);
    // console.log(facilityId);
    await updateData(id, {
      isPublished: true,
      facility_id: facilityId,
    });
  };

  return (
    <>
      {events.length <= 0 ? (
        <IonCard className="card ion-padding">
          <IonCardTitle>
            <IonLabel className="card-label">
              <span className="form-title">No Events available</span>
            </IonLabel>
          </IonCardTitle>
        </IonCard>
      ) : (
        <IonCard>
          <IonCardTitle>
            <IonLabel className="card-label">
              <span className="form-title">Select an Event</span>
            </IonLabel>
          </IonCardTitle>
          <IonCardTitle></IonCardTitle>
        </IonCard>
      )}
    </>
  );
};

export default AddEvent;

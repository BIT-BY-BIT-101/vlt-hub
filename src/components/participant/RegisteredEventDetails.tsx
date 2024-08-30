import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import React from "react";
import useGetDoc from "../../hooks/useGetDoc";
import { useParams } from "react-router";
import EventsModal from "../modals/EventsModal";
import Loader from "../loaders/Loader";
import {
  formatDateString,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
import useGetEvent from "../../hooks/useGetEvent";
import PageNotFound from "../../pages/error_pages/PageNotFound";
import { Label } from "recharts";

type RouteParams = {
  id: string;
};

const RegisteredEventDetails = () => {
  const { id } = useParams<RouteParams>();
  // const { data: event, error, loading } = useGetDoc("events", id);
  const { data: event, error, hostInfo, loading } = useGetEvent(id);

  console.log(id);

  console.log(event);

  if (loading) {
    return <p>loading.....</p>;
  }

  if (error) {
    <IonCard className="card">
      <IonItem className="item-bg-none">Something went wrong</IonItem>
    </IonCard>;
  }

  if (event) {
    return (
      <IonCard className="card">
        <IonCardTitle>
          <IonItem className="item-bg-none">
            <p>
              <IonLabel className="">
                <h1>{event.title}</h1>
              </IonLabel>
              <IonLabel>
                <p>
                  <span className="text-color-rgb">Hosted by: </span>
                  {hostInfo?.fname} {hostInfo?.lname}
                </p>
              </IonLabel>
            </p>
          </IonItem>
        </IonCardTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IonImg src={event?.imageUrl} style={{ width: "50vw" }} />
        </div>

        <IonItem className="item-bg-none">
          <IonLabel slot="start">
            <p>
              <span className="text-color-rgb">Date: </span>
              {formatDateString(event?.event_date)}
            </p>
          </IonLabel>
        </IonItem>
        <IonItem className="item-bg-none">
          <IonLabel>
            <p>
              <span className="text-color-rgb">Time: </span>
              {formatTimeString(event?.start_time)} -{" "}
              {formatTimeString(event?.end_time)}
            </p>
          </IonLabel>
        </IonItem>
        <IonItem className="item-bg-none">
          <IonLabel>
            <p>
              <span className="text-color-rgb">Description:</span>
            </p>
          </IonLabel>
        </IonItem>
        <IonCardContent>
          <IonItem className="item-bg-none">{event?.description}</IonItem>
        </IonCardContent>
      </IonCard>
    );
  } else {
    return <IonItem className="item-bg-none">Event not found</IonItem>;
  }
};

export default RegisteredEventDetails;

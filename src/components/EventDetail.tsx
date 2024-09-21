import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import React, { useContext } from "react";
import useGetDoc from "../hooks/useGetDoc";
import { useParams } from "react-router";
import EventsModal from "./modals/EventsModal";
import Loader from "./loaders/Loader";
import {
  formatDateString,
  formatTimeString,
} from "../helpers/DateTimeFunctions";
import useGetEvent from "../hooks/useGetEvent";
import PageNotFound from "../pages/error_pages/PageNotFound";
import { Label } from "recharts";
import { create, createSharp } from "ionicons/icons";
import { AuthContext } from "../context/AuthContext";

type RouteParams = {
  id: string;
};

const EventDetail = () => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams<RouteParams>();
  // const { data: event, error, loading } = useGetDoc("events", id);
  const { data: event, error, hostInfo, loading } = useGetEvent(id);

  // console.log(id);

  // console.log(event);

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
      <>
        <div className="event-page ion-margin-top ion-padding margin-left margin-right">
          <IonCardTitle>
            <IonItem color={"none"} className="ion-text-center" lines="none">
              <IonLabel className="ion-text-center">
                <h1
                  style={{
                    fontWeight: "bold",
                    color: "var(--ion-color-primary)",
                  }}
                >
                  {event.title}
                </h1>
              </IonLabel>
            </IonItem>
          </IonCardTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IonImg
              src={event?.imageUrl}
              style={{ objectFit: "cover", height: "400px", width: "100%" }}
            />
          </div>
          <IonItem color={"none"} className="ion-text-center" lines="none">
            <IonLabel>
              <span
                style={{
                  fontWeight: "bold",
                  width: "100%",
                  color: "var(--ion-color-primary)",
                }}
              >
                by: {hostInfo?.fname} {hostInfo?.lname}{" "}
              </span>
            </IonLabel>
          </IonItem>
          {currentUser?.data.role === "host" && (
            <IonItem color={"none"}>
              <IonButton slot="end" className="ion-padding">
                Edit Course
                <IonIcon slot="icon-only" icon={createSharp} />
              </IonButton>
            </IonItem>
          )}

          <IonItem color={"none"} lines="none">
            <IonLabel slot="start">
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "var(--ion-color-primary)",
                }}
              >
                Date:{" "}
              </span>
              <p style={{ color: "black" }}>
                {formatDateString(event?.event_date)}
              </p>
            </IonLabel>
          </IonItem>
          <IonItem className="item-bg-none" lines="none">
            <IonLabel>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "var(--ion-color-primary)",
                }}
              >
                Time:{" "}
              </span>
              <p style={{ color: "black" }}>
                {formatTimeString(event?.start_time)} -{" "}
                {formatTimeString(event?.end_time)}
              </p>
            </IonLabel>
          </IonItem>
          <IonItem className="item-bg-none" lines="none">
            <IonLabel>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "var(--ion-color-primary)",
                }}
              >
                Description:
              </span>
            </IonLabel>
          </IonItem>
          <IonCardContent>
            {/* <IonItem className="item-bg-none">{event?.description}</IonItem> */}
            <p
              style={{ color: "black" }}
              dangerouslySetInnerHTML={{
                __html: event?.description.replace(/\n/g, "<br />"),
              }}
            />
          </IonCardContent>
        </div>
      </>
    );
  } else {
    return <IonItem className="item-bg-none">Event not found</IonItem>;
  }
};

export default EventDetail;

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
import React, { useContext, useEffect } from "react";
import useGetDoc from "../hooks/useGetDoc";
import { useLocation, useParams } from "react-router";
import EventsModal from "./modals/EventsModal";
import Loader from "./loaders/Loader";
import {
  formatDateString,
  formatTimeString,
} from "../helpers/DateTimeFunctions";
import useGetEvent from "../hooks/useGetEvent";
import PageNotFound from "../pages/error_pages/PageNotFound";
import { Label } from "recharts";
import { arrowUpCircleSharp, create, createSharp } from "ionicons/icons";
import { AuthContext } from "../context/AuthContext";
import { UpdateDataContext } from "../context/UpdateDataContext";
import useFirestore from "../hooks/useFirestore";
import { serverTimestamp } from "firebase/firestore";

type RouteParams = {
  id: string;
};

const EventDetail = () => {
  // const { setData } = useContext(UpdateDataContext);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams<RouteParams>();
  // const { data: event, error, loading } = useGetDoc("events", id);
  const { data: event, error, hostInfo, loading } = useGetEvent(id);
  const { updateData: updateStatus } = useFirestore("events");

  const location = useLocation();
  const updatedEvent = location.state?.updatedEvent; // Access updated data if passed

  useEffect(() => {
    if (updatedEvent) {
      // Use the updated data, for example, to set it to a local state
      console.log("Received updated data:", updatedEvent);
    }
  }, [updatedEvent]);
  if (loading && !event) {
    return <p>loading.....</p>;
  }

  if (error) {
    <IonCard className="card">
      <IonItem className="item-bg-none">Something went wrong</IonItem>
    </IonCard>;
  }

  const handlePublishBtn = async (data: any) => {
    await updateStatus(data.id!, {
      status: "published",
    });
  };
  const handleConfirmed = async (data: any) => {
    await updateStatus(data.id!, {
      status: "paying",
      is_confirmed: true,
      updatedAt: serverTimestamp(),
    });
  };

  const eventData = updatedEvent || event;

  // if (event) {
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
                {eventData.title}
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
            src={eventData?.imageUrl}
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
            {eventData?.is_confirmed ? (
              <IonButton
                slot="start"
                className="ion-padding"
                // routerLink={`/host/event/${id}/edit`}
                onClick={() => handlePublishBtn(event)}
                disabled={eventData.is_confirmed ? false : true}
              >
                Publish
                <IonIcon slot="icon-only" icon={createSharp} />
              </IonButton>
            ) : (
              <IonButton
                slot="start"
                className="ion-padding"
                // routerLink={`/host/event/${id}/edit`}
                onClick={() => handleConfirmed(event)}
                disabled={eventData.status !== "confirming" ? true : false}
              >
                {eventData.status !== "confirming" ? "Pending" : "Confirm"}
                <IonIcon slot="icon-only" icon={arrowUpCircleSharp} />
              </IonButton>
            )}
            <IonButton
              slot="end"
              className="ion-padding"
              routerLink={`/host/event/${id}/edit`}
            >
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
              {formatDateString(eventData?.event_date)}
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
              {formatTimeString(eventData?.start_time)} -{" "}
              {formatTimeString(eventData?.end_time)}
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
              __html: eventData?.description.replace(/\n/g, "<br />"),
            }}
          />
        </IonCardContent>
      </div>
    </>
  );
  // } else {
  //   return <IonItem className="item-bg-none">Event not found</IonItem>;
  // }
};

export default EventDetail;

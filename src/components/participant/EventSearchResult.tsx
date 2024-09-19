import React from "react";
import { useLocation } from "react-router-dom";
import useSearchEventQuery from "../../hooks/useSearchEventQuery";
import {
  IonSkeletonText,
  IonCol,
  IonImg,
  IonItem,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonText,
  IonLabel,
} from "@ionic/react";
import { timeOutline } from "ionicons/icons";
import { formatDateString } from "../../helpers/DateTimeFunctions";
import { EventDataModel } from "../../models/Model";

const EventSearchResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const { data: events, error, loading } = useSearchEventQuery();
  console.log(query);
  console.log(events);

  const filteredEvents = query
    ? events?.filter((event) =>
        event.title.toLowerCase().includes(query.toLowerCase())
      )
    : events;

  return (
    <>
      {loading ? (
        <IonSkeletonText animated style={{ width: "100%", height: "100%" }} />
      ) : (
        <>
          {events?.length !== 0 ? (
            filteredEvents.map((event: EventDataModel) => (
              <IonCol
                size="auto"
                sizeXs="12"
                sizeMd="4"
                sizeLg="3"
                key={event.id}
                style={{ marginBottom: "20px" }}
              >
                <div
                  className="card ion-margin-left ion-margin-right"
                  // onClick={openModal}
                  onClick={() =>
                    history.push(`/participant/event/details/${event.id}`)
                  }
                  // onClick={() => {
                  //   setShowModal(true);
                  //   setSelected(event);
                  // }}
                >
                  <IonImg
                    src={event.imageUrl ? event.imageUrl : Default}
                    alt={event.title}
                    // className="event-card-image"
                    className="poster-img"
                  />
                  <IonItem className="item-color"></IonItem>

                  <IonCardHeader className="card-header">
                    <IonCardTitle
                      className="card-title f-weight-bold"
                      // style={{ fontSize: getFontSizeForTitle(event.title) }}
                    >
                      {/* {event.title.slice(0, 100)}{" "} */}
                      {/* Replace '20' with the desired length */}
                      {/* {event.title.length > 100 && "..."}{" "} */}
                      {/* Add ellipsis if title is longer */}
                      {event.title}
                    </IonCardTitle>
                  </IonCardHeader>

                  <IonItem className="item-color-dark">
                    <IonIcon
                      className="text-color-dark"
                      icon={timeOutline}
                      slot="start"
                    />
                    <IonText>{formatDateString(event.event_date)}</IonText>
                  </IonItem>
                  <IonItem className="item-color">
                    <IonLabel>
                      <p
                        className={`${
                          event.event_fee
                            ? "phome-event-paid"
                            : "phome-event-free"
                        }`}
                      >
                        {event.event_fee ? `PHP ${event.event_fee}` : "Free"}
                      </p>
                    </IonLabel>
                  </IonItem>
                </div>
              </IonCol>
            ))
          ) : (
            <IonItem className="item-bg-none">
              There is no current Event Available
            </IonItem>
          )}
        </>
      )}
    </>
  );
};

export default EventSearchResult;

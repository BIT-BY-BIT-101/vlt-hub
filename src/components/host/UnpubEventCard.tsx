import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import React, { useState } from "react";
import { EventDataModel } from "../../models/Model";
import useQuery from "../../hooks/useQuery";
import {
  formatDateString,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
import defaultImage from "../../assets/defaultCover.jpg";
import "./UnpubEventCard.css";
import useFirestore from "../../hooks/useFirestore";
import useFetchUnpublishedEvent from "../../hooks/useFetchUnpublishedEvent";
export const UnpubEventCard = () => {
  const [imageLoadError, setImageLoadError] = useState(false);
  // const { data: events } = useQuery("events", "status", "==", "unpublished");
  const { data: events } = useFetchUnpublishedEvent();
  const { updateData: updateStatus } = useFirestore("events");
  console.log(events);

  const handleImageError = () => {
    setImageLoadError(true);
    if (imageLoadError) {
      console.log("Error loading the image");
    }
  };

  const handlePublishBtn = async (data) => {
    await updateStatus(data.id!, {
      status: "published",
    });
  };

  return (
    <IonGrid>
      <div className="w-100 ion-margin">
        <IonButton routerLink={`/host/venue-list`}>Create Event</IonButton>
      </div>
      <IonRow>
        {events?.length === 0 ? (
          <IonCard>
            <IonCardContent>
              <IonLabel>No unpublished events available</IonLabel>
            </IonCardContent>
          </IonCard>
        ) : (
          events.map((event: EventDataModel) => (
            <IonCol size="12" size-sm="4" key={event.id}>
              <IonCard className="card">
                <IonImg
                  className="cover-img"
                  src={
                    imageLoadError
                      ? defaultImage
                      : event.imgUrl || event.imageUrl
                  }
                  onError={handleImageError}
                />

                <IonCardHeader>
                  <IonCardTitle>
                    {event.title.slice(0, 30)}{" "}
                    {/* Replace '20' with the desired length */}
                    {event.title.length > 20 && "..."}{" "}
                    {/* Add ellipsis if title is longer */}
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
                      Date: <p>{formatDateString(event.eventDate)}</p>
                    </strong>
                  </IonItem>
                  <IonItem>
                    <strong>
                      Start Time: <p>{formatTimeString(event.startTime)}</p>
                    </strong>
                  </IonItem>
                  <IonItem>
                    <strong>
                      End Time: <p>{formatTimeString(event.endTime)}</p>
                    </strong>
                  </IonItem>
                </IonCardContent>
                <IonButton
                  className="publish-btn"
                  onClick={() => handlePublishBtn(event)}
                >
                  Publish
                </IonButton>
                <IonButton className="publish-btn">Chat</IonButton>
              </IonCard>
            </IonCol>
          ))
        )}
      </IonRow>
    </IonGrid>
  );
};

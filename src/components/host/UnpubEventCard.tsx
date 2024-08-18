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
import React, { useContext, useState } from "react";
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
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { handleWindowRoute } from "../../helpers/Helpers";
export const UnpubEventCard = () => {
  const { currentUser } = useContext(AuthContext);
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

  const handlePublishBtn = async (data: any) => {
    await updateStatus(data.id!, {
      status: "published",
    });
  };

  const handleChatButtonClick = async (data: any) => {
    console.log("clicked");

    const ownerId = data.venue_owner_id;
    const hostId = currentUser?.uid;
    const chatRoomId = `${ownerId}_${hostId}`; // Create a unique chat room ID based on venue and host IDs
    const chatRoomRef = doc(db, "chats", chatRoomId);

    // Check if the chat room already exists
    const chatRoomSnap = await getDoc(chatRoomRef);
    if (!chatRoomSnap.exists()) {
      // Create the chat room document
      await setDoc(chatRoomRef, {
        owner_id: ownerId,
        host_id: hostId,
        createdAt: serverTimestamp(),
        // Add any other necessary fields
      });
    }

    // Navigate to the chat room or open the chat interface
    handleWindowRoute(`/host/chat/${chatRoomId}/messages`);
    // toggleChatBox(chatRoomId);
    // You might need to use a router or navigation library here
    console.log("Chat button clicked for event:", data);
  };

  const handleConfirmed = async (data: any) => {
    await updateStatus(data.id!, {
      status: "paying",
      is_confirmed: true,
      updatedAt: serverTimestamp(),
    });
  };

  return (
    <IonGrid>
      <div className="w-100 ion-margin">
        <IonButton
          routerLink={`/host/venue-list`}
          shape="round"
          color={"tertiary"}
          size="large"
        >
          Create Event
        </IonButton>
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
                  <IonCardTitle className="card-title f-weight-bold">
                    {event.title.slice(0, 30)}{" "}
                    {/* Replace '20' with the desired length */}
                    {event.title.length > 20 && "..."}{" "}
                    {/* Add ellipsis if title is longer */}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem className="item-color-dark">
                    <strong>
                      Venue: <p>{event.venue}</p>
                    </strong>
                  </IonItem>
                  <IonItem className="item-color-dark">
                    <strong>
                      Date: <p>{formatDateString(event.event_date)}</p>
                    </strong>
                  </IonItem>
                  <IonItem className="item-color-dark">
                    <strong>
                      Start Time: <p>{formatTimeString(event.start_time)}</p>
                    </strong>
                  </IonItem>
                  <IonItem className="item-color-dark">
                    <strong>
                      End Time: <p>{formatTimeString(event.end_time)}</p>
                    </strong>
                  </IonItem>
                </IonCardContent>
                {event.is_confirmed ? (
                  <IonButton
                    className="publish-btn"
                    color={"tertiary"}
                    shape="round"
                    onClick={() => handlePublishBtn(event)}
                    disabled={event.is_confirmed ? false : true}
                  >
                    Publish
                  </IonButton>
                ) : (
                  <IonButton
                    className="publish-btn"
                    color={"tertiary"}
                    shape="round"
                    onClick={() => handleConfirmed(event)}
                    disabled={event.status !== "confirming" ? true : false}
                  >
                    {event.status !== "confirming" ? "Pending" : "Confirm"}
                  </IonButton>
                )}
                <IonButton
                  className="publish-btn"
                  shape="round"
                  color={"tertiary"}
                  onClick={() => handleChatButtonClick(event)}
                >
                  Chat
                </IonButton>
              </IonCard>
            </IonCol>
          ))
        )}
      </IonRow>
    </IonGrid>
  );
};

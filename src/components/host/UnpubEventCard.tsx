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

  // Function to dynamically calculate font size based on title length
  const getFontSizeForTitle = (title: string) => {
    if (title.length > 30) {
      return "14px";
    }
  };

  return (
    <IonGrid className="margin-left margin-right">
      <div className="w-100 ion-margin">
        <IonButton
          // routerLink={`/host/venue-list`}
          routerLink={`/host/create`}
          shape="round"
          color={"primary"}
          // size="large"
        >
          Create Event
        </IonButton>
      </div>
      {events?.length === 0 ? (
        <IonItem className="item-bg-none">
          <IonLabel className="item-bg-none">
            No unpublished events available
          </IonLabel>
        </IonItem>
      ) : (
        <IonRow className="">
          {events.map((event: EventDataModel) => (
            <IonCol
              size="auto"
              sizeXs="12"
              size-sm="12"
              size-md="4"
              sizeLg="3"
              sizeXl="3"
              // className="w-100"
              key={event.id}
            >
              <div className="card ion-margin-left  ion-margin-right">
                <IonItem
                  color={event.status === "rejected" ? "danger" : "primary"}
                  className="ion-text-uppercase"
                >
                  <IonLabel>{event.status}</IonLabel>
                </IonItem>
                <IonImg
                  className="poster-img"
                  src={
                    imageLoadError
                      ? defaultImage
                      : event.imgUrl || event.imageUrl
                  }
                  onError={handleImageError}
                />

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

                {/* <IonCardContent> */}
                <IonItem className="item-bg-none">
                  <IonLabel className="card-label">
                    <strong className="card-title">Date: </strong>
                    <p>{formatDateString(event.event_date)}</p>
                  </IonLabel>
                </IonItem>
                <IonItem className="item-bg-none">
                  <IonLabel className="card-label">
                    <strong className="card-title">Time: </strong>
                    <p>
                      {formatTimeString(event.start_time)} -{" "}
                      {formatTimeString(event.end_time)}
                    </p>
                  </IonLabel>
                </IonItem>
                {/* </IonCardContent> */}
                <IonItem className="item-bg-none">
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
                    slot="end"
                    routerLink={`/host/event/details/${event.id}`}
                    // onClick={() => handleChatButtonClick(event)}
                  >
                    View
                  </IonButton>
                </IonItem>
              </div>
            </IonCol>
          ))}
        </IonRow>
      )}
    </IonGrid>
  );
};

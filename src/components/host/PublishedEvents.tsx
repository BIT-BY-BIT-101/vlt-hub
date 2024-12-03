import { IonItem, IonLabel, IonList } from "@ionic/react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import {
  formatDateString,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
import { handleWindowRoute } from "../../helpers/Helpers";
import RequestModal from "../modals/RequestModal";
import useFetchpublishEvents from "../../hooks/useFetchpublishEvents";

const PublishedEvents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState();
  const { currentUser } = useContext(AuthContext);

  const { data: eventsData, hostInfo } = useFetchpublishEvents();

  console.log(eventsData);

  const handleChatButtonClick = async (request: any) => {
    const ownerId = currentUser?.uid;
    const hostId = request.host_id;
    const chatRoomId = `${ownerId}_${hostId}`; // Create a unique chat room ID based on venue and host IDs
    const chatRoomRef = doc(db, "chats", chatRoomId);

    // Check if the chat room already exists
    // const chatRoomSnap = await getDoc(chatRoomRef);
    // if (!chatRoomSnap.exists()) {
    //   // Create the chat room document
    //   await setDoc(chatRoomRef, {
    //     owner_id: ownerId,
    //     host_id: hostId,
    //     createdAt: serverTimestamp(),
    //     // Add any other necessary fields
    //   });
    // }

    // Navigate to the chat room or open the chat interface
    handleWindowRoute(`/venue/chat/${chatRoomId}/messages`);
    // toggleChatBox(chatRoomId);
    // You might need to use a router or navigation library here
    console.log("Chat button clicked for request:", request);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  console.log(eventsData);

  return (
    <>
      <IonItem
        style={{ color: "var(--ion-color-primary)" }}
        color={"none"}
        lines="none"
      >
        <IonLabel>
          <h1 style={{ fontWeight: "bold" }}>Upcomming Events</h1>
        </IonLabel>
      </IonItem>
      {eventsData?.length === 0 ? (
        <div className="card">
          <IonList className="item-bg-none">
            <IonItem className="item-bg-none">
              <IonLabel>No Requests at the moment</IonLabel>
            </IonItem>
          </IonList>
        </div>
      ) : (
        eventsData?.map((request: any) => (
          <div className="ion-margin my-items" key={request.id}>
            <IonList className="item-bg-none">
              <IonItem
                className="item-bg-none cursor-pointer"
                routerLink={`/host/event/details/${request.id}`}
              >
                <IonLabel slot="start" className="item-label">
                  {request.title}
                  <p>{request.host_name}</p>
                </IonLabel>
                <IonLabel slot="start" className="item-label">
                  Date
                  <p>{formatDateString(request.date_from)}</p>
                </IonLabel>
                <IonLabel slot="start" className="item-label">
                  Time
                  <p>{`${formatTimeString(
                    request?.start_time
                  )}-${formatTimeString(request?.end_time)}`}</p>
                </IonLabel>

                {/* <IonLabel slot="end">
                  Status
                  <p>{request.status}</p>
                </IonLabel> */}
              </IonItem>
            </IonList>
          </div>
        ))
      )}
      <RequestModal
        isOpen={isOpen}
        onDidDismissal={handleCloseModal}
        onClose={handleCloseModal}
        selected={selected}
      />
      {/* <ChatBox isOpen={isOpen} id={chatroomId} /> */}
    </>
  );
};

export default PublishedEvents;

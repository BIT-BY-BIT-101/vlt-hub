import {
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonCard,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { closeCircle, server } from "ionicons/icons";
import React, { useContext, useState } from "react";
import useQuery from "../../hooks/useQuery";
import { AuthContext } from "../../context/AuthContext";
import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import useGetDoc from "../../hooks/useGetDoc";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { handleWindowRoute } from "../../helpers/Helpers";
import ChatBox from "../messaging/ChatBox";
import RequestModal from "../modals/RequestModal";
import useGetRequest from "../../hooks/useFetchRequests";
import { formatDateString } from "../../helpers/DateTimeFunctions";

const RequestItems = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState();
  const { currentUser } = useContext(AuthContext);
  // const { data: requests } = useQuery(
  //   "requests",
  //   "host_id",
  //   "==",
  //   currentUser?.uid
  // );
  // const { data: requestData } = useQuery(
  //   "requests",
  //   "venue_id",
  //   "==",
  //   currentUser?.data.venueId
  // );
  const { data: requestData } = useGetRequest();

  // const [isOpen, setIsOpen] = useState(false);
  // const [chatroomId, setChatRoomId] = useState("");

  // const toggleChatBox = (id: string) => {
  //   setIsOpen(!isOpen);
  //   setChatRoomId(id);
  // };

  const handleChatButtonClick = async (request: any) => {
    const ownerId = currentUser?.uid;
    const hostId = request.host_id;
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

  console.log(requestData);

  return (
    <>
      {requestData?.length === 0 ? (
        <IonCard className="card">
          <IonList className="item-bg-none">
            <IonItem className="item-bg-none">
              <IonLabel>No Requests at the moment</IonLabel>
            </IonItem>
          </IonList>
        </IonCard>
      ) : (
        requestData?.map((request: any) => (
          <IonCard className="card" key={request.id}>
            <IonList className="item-bg-none">
              <IonItem className="item-bg-none">
                <IonLabel slot="start" className="item-label">
                  {request.event_title}
                  <p>{request.host_name}</p>
                </IonLabel>
                <IonLabel slot="start" className="item-label">
                  Date
                  <p>{formatDateString(request.event_date)}</p>
                </IonLabel>
                {/* <IonButton
                    slot="end"
                    fill="outline"
                    color={"tertiary"}
                    shape="round"
                    onClick={() => handleChatButtonClick(request)}
                  >
                    Chat
                  </IonButton> */}

                <IonLabel slot="end">
                  Status
                  <p>{request.status}</p>
                </IonLabel>
                <IonButton
                  slot="end"
                  shape="round"
                  color="primary"
                  // onClick={handleOpenModal}
                  onClick={() => {
                    setIsOpen(true);
                    setSelected(request);
                  }}
                >
                  View
                </IonButton>
                <IonIcon
                  icon={closeCircle}
                  slot="end"
                  className="text-color-dark cursor-pointer"
                />
              </IonItem>
            </IonList>
          </IonCard>
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

export default RequestItems;

import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
import React from "react";
import MessageBubble from "../ui/MessageBubble";

const MessageCard = () => {
  return (
    <>
      <IonCard className="ct-card">
        <IonCardHeader>Chat</IonCardHeader>
        <IonCardContent>
          <MessageBubble />
          <MessageBubble />
          <MessageBubble />
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default MessageCard;

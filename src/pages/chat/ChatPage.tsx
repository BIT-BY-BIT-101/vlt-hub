import React from "react";
import ChatInput from "../../components/forms/ChatInput";
import MessageCard from "../../components/cards/MessageCard";
import { IonPage } from "@ionic/react";

export const ChatPage = () => {
  return (
    <IonPage className="page-style">
      <MessageCard />
      <ChatInput />
    </IonPage>
  );
};

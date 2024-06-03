import ChatInput from "../../components/messaging/ChatInput";
import MessageCard from "../../components/messaging/MessageCard";
import { IonPage } from "@ionic/react";

export const ChatPage = () => {
  return (
    <IonPage className="page-style">
      <MessageCard />
      <ChatInput />
    </IonPage>
  );
};

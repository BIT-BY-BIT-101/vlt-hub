import React, { useRef, useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import { useParams } from "react-router-dom";
import { auth } from "../../config/firebase";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { serverTimestamp } from "firebase/firestore";
import {
  IonButton,
  IonButtons,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
} from "@ionic/react";
import "./ChatInput.css";
import { useForm } from "react-hook-form";

type RouteParams = {
  id: string;
};

const ChatInput = () => {
  const { id } = useParams<RouteParams>();
  // const { data: messages } = useFirestore(`chats/${id}/messages`);
  const { addData: newMessage } = useFirestore(`chats/${id}/messages`);
  const { register, handleSubmit, reset } = useForm();
  // const formValue = watch("message", "");
  const latestMessageRef = useRef<HTMLIonContentElement | null>(null);

  const [formValue, setFormValue] = useState("");

  const handleInputChange = (e: CustomEvent) => {
    const value = (e.target as HTMLIonTextareaElement).value!;
    setFormValue(value);
  };

  const sendMessage = async (data: any) => {
    // e.preventDefault();

    const messageToSend = {
      // message: formValue,
      ...data,
      createdAt: serverTimestamp(),
      uid: auth.currentUser?.uid,
      status: "sent",
    };

    await newMessage(messageToSend);

    latestMessageRef.current?.scrollIntoView({ behavior: "smooth" });

    // reset();
    setFormValue("");
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLIonTextareaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(sendMessage)();
    }
  };
  console.log(formValue);
  return (
    <div className="d-flex">
      <IonItem
        // className="textarea-item"
        className=""
      >
        <IonTextarea
          aria-label="message"
          // className="message-input"
          className="form-input"
          // onIonChange={(e) => setFormValue(e.target.value!)}
          {...register("message")}
          value={formValue}
          onIonInput={handleInputChange}
          onKeyPress={handleKeyPress}
        ></IonTextarea>
        <IonButtons>
          <IonButton
            className="form-input"
            // className="send-button"
            onClick={handleSubmit(sendMessage)}
            disabled={!formValue.trim()}
          >
            Send
          </IonButton>
        </IonButtons>
      </IonItem>
      {/* <div ref={latestMessageRef}></div> */}
      {/* <IonItem className="button-item"></IonItem> */}
    </div>
  );
};

export default ChatInput;

import React, { useRef, useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import { useParams } from "react-router-dom";
import { auth } from "../../config/firebase";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { serverTimestamp } from "firebase/firestore";
import {
  IonButton,
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
  const dummy = useRef();
  const { id } = useParams<RouteParams>();
  const { user } = useFirebaseAuth();
  const { data: messages } = useFirestore(`chats/${id}/messages`);
  const { addData: newMessage } = useFirestore(`chats/${id}/message`);
  const { register, handleSubmit, reset } = useForm();

  const [formValue, setFormValue] = useState("");

  const sendMessage = async () => {
    // e.preventDefault();

    const messageToSend = {
      // message: formValue,
      createdAt: serverTimestamp(),
      uid: auth.currentUser?.uid,
      status: "sent",
    };

    console.log(formValue);

    await newMessage(messageToSend);
    console.log(newMessage);

    setFormValue("");
    dummy?.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="d-flex">
      <IonItem className="textarea-item">
        <IonTextarea
          aria-label="message"
          className="message-input"
          // onIonChange={(e) => setFormValue(e.target.value!)}
          {...register("message")}
        ></IonTextarea>
      </IonItem>
      <IonItem className="button-item">
        <IonButton className="send-button" onClick={handleSubmit(sendMessage)}>
          Send
        </IonButton>
      </IonItem>
    </div>
  );
};

export default ChatInput;

import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonContent,
  IonButtons,
} from "@ionic/react";
import { sendSharp, closeCircle } from "ionicons/icons";
import "./ChatBox.css";
import {
  DocumentData,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  onSnapshot,
} from "firebase/firestore";
import { useParams } from "react-router";
import { db } from "../../config/firebase";
import { MessageModel } from "../../models/Model";

type Props = {
  isOpen: boolean;
  id: string;
};

const ChatBox = ({ isOpen, id }: Props) => {
  //   const [isOpen, setIsOpen] = useState(false);
  //   const [messages, setMessages] = useState([]);
  //   const [newMessage, setNewMessage] = useState("");

  //   const toggleChatBox = () => {
  //     setIsOpen(!isOpen);
  //   };

  //   const handleSendMessage = () => {
  //     if (newMessage.trim()) {
  //       setMessages([...messages, newMessage]);
  //       setNewMessage("");
  //     }
  //   };

  //   const { id } = useParams<RouteParams>();
  const [messages, setMessages] = useState();
  // const { data: messages } = useFirestore(`chats/${id}/messages`);
  const [lastVisible, setLastVisible] = useState<DocumentData>();
  const [isLoading, setIsLoading] = useState(false);
  // const latestMessageRef = useRef<HTMLIonContentElement | null>(null);
  const latestMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchInitialMessages = async () => {
      setIsLoading(true);
      const chatRef = collection(db, `chats/${id}/messages`);
      const q = query(chatRef, orderBy("createdAt", "desc"), limit(15));
      const documentSnapshots = await getDocs(q);
      const collectionData: MessageModel[] = documentSnapshots.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );
      setMessages(collectionData.reverse());
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      setIsLoading(false);
      scrollToBottom();
    };

    fetchInitialMessages();
  }, [id]);

  const fetchMoreMessages = async () => {
    if (!lastVisible || isLoading) return;

    setIsLoading(true);
    const chatRef = collection(db, `chats/${id}/messages`);
    const next = query(
      chatRef,
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(10)
    );
    const documentSnapshots = await getDocs(next);
    const collectionData: MessageModel[] = documentSnapshots.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
    setMessages((prev) => [...collectionData.reverse(), ...prev]);
    setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
    setIsLoading(false);
    console.log(messages.length);
  };

  // useEffect(() => {
  //   const unsub = fetchMoreMessages();
  //   return () => unsub;
  // }, []);

  const handleScroll = (event: CustomEvent<void>) => {
    const infiniteScroll = event.target as HTMLIonInfiniteScrollElement;
    fetchMoreMessages().then(() => infiniteScroll.complete());
  };
  const scrollToBottom = () => {
    // latestMessageRef.current?.scrollToBottom(300);
    latestMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const chatRef = collection(db, `chats/${id}/messages`);

    const q = query(
      chatRef,
      orderBy("createdAt", "desc"),
      // startAfter(lastVisible),
      limit(10)
    );

    // const documentSnapshots = await getDocs(next);

    const unsub = onSnapshot(q, (doc) => {
      // const unsub = onSnapshot(collection(db, collectionPath), (doc) => {
      const collectionData: any = [];
      doc.forEach((doc) => {
        collectionData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(collectionData.reverse());
      // setLastVisible();
      scrollToBottom();

      console.log("Data Retreive");
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  console.log(messages);

  return (
    <div className={`chat-box ${isOpen ? "open" : "ion-hide"} `}>
      <div className="chat-box-header">
        <IonButtons>
          <IonButton
            //   onClick={toggleChatBox}
            fill="clear"
          >
            <IonIcon
              icon={isOpen ? closeCircle : sendSharp}
              //   className="bg-color-main"
            />
          </IonButton>
        </IonButtons>
      </div>
      {isOpen && (
        <div className="chat-box-content">
          <IonContent>
            <div className="chat-box-messages">
              {messages.map((msg, index) => (
                <div key={index} className="chat-box-message">
                  {msg}
                </div>
              ))}
            </div>
          </IonContent>
          <div className="chat-box-input">
            <IonInput
              value={newMessage}
              placeholder="Type a message..."
              onIonChange={(e) => setNewMessage(e.detail.value)}
            />
            <IonButton onClick={handleSendMessage}>
              <IonIcon icon={sendSharp} />
            </IonButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

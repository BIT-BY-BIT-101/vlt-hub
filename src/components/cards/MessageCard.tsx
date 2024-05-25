import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonFooter,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "../ui/MessageBubble";
import useFirestore from "../../hooks/useFirestore";
import { MessageModel } from "../../models/Model";
import { useParams } from "react-router-dom";
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import "./MessageCard.css";

type RouteParams = {
  id: string;
};

const MessageCard = () => {
  const { id } = useParams<RouteParams>();
  const [messages, setMessages] = useState();
  // const { data: messages } = useFirestore(`chats/${id}/messages`);
  const [lastVisible, setLastVisible] = useState<DocumentData>();
  const [isLoading, setIsLoading] = useState(false);
  // const latestMessageRef = useRef<HTMLIonContentElement | null>(null);
  const latestMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
    setMessages((prevMessages) => [
      ...collectionData.reverse(),
      ...prevMessages,
    ]);
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
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        scrollY={true}
        fullscreen={true}
        // ref={latestMessageRef}
      >
        <IonInfiniteScroll
          threshold="100px"
          onIonInfinite={handleScroll}
          position="top"
        >
          <IonInfiniteScrollContent
            loadingText="Loading more messages..."
            loadingSpinner="bubbles"
          />
        </IonInfiniteScroll>
        {/* <IonCard className="ct-card">
        <IonCardHeader>Chat</IonCardHeader>
      <IonCardContent> */}
        {messages?.map((message: MessageModel) => (
          <IonItem key={message.id}>
            <MessageBubble data={message} />
            <div ref={latestMessageRef}></div>
          </IonItem>
        ))}
        {/* <div ref={scrollToBottom}></div> */}

        {/* </IonCardContent>
      </IonCard> */}
      </IonContent>
      <IonFooter>Hello</IonFooter>
    </>
  );
};

export default MessageCard;

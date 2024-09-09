import { collection, query, where, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { EventDataModel } from "../models/Model";

const useFetchParticipantingEvents = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState<EventDataModel>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, "events");
    const q = query(
      colRef,
      where("status", "==", "published"),
      where("participants", "array-contains", currentUser?.uid)
    );

    const unsub = onSnapshot(q, (doc) => {
      // const unsub = onSnapshot(collection(db, collectionPath), (doc) => {
      const collectionData: any = [];
      doc.forEach((doc) => {
        collectionData.push({ id: doc.id, ...doc.data() });
      });
      setData(collectionData);
      setLoading(false);
      console.log("Data Refreshed");
    });
    return () => unsub();
  }, []);

  return { data, loading, error };
};

export default useFetchParticipantingEvents;

import React, { useEffect, useState } from "react";
import { EventDataModel } from "../models/Model";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

const useFetchUnpublishedEvent = () => {
  const [data, setData] = useState<EventDataModel>([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, "events");
    const q = query(colRef, where("status", "==", "unpublished"));

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

  return { data, error, loading };
};

export default useFetchUnpublishedEvent;

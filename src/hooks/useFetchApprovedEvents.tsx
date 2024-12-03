import React from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  DocumentData,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { EventDataModel } from "../models/Model";

const useFetchApprovedEvents = () => {
  const [data, setData] = useState<DocumentData[]>([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, "events");
    const q = query(
      colRef,
      where("isApproved", "==", true),
      where("isPublished", "==", false),
      orderBy("date_from", "desc")
    );

    const unsub = onSnapshot(q, (doc) => {
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

export default useFetchApprovedEvents;

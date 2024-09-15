import React, { useContext, useEffect, useState } from "react";
import { EventDataModel } from "../models/Model";
import {
  and,
  collection,
  getDocs,
  onSnapshot,
  or,
  query,
  QueryFieldFilterConstraint,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";

const useFetchUnpublishedEvent = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState<EventDataModel>([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, "events");
    const q = query(
      colRef,
      and(
        where("host_id", "==", currentUser?.uid),
        or(
          // where("status", "==", "unpublished"),
          // where("status", "==", "for confirmation"),
          // where("status", "==", "rejected"),
          // where("status", "==", "confirming"),
          // where("status", "==", "confirmed"),
          // where("status", "==", "paying"),
          where("is_transaction_complete", "==", false)
        )
      )
      // where("host_id", "==", currentUser?.uid),
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

  return { data, error, loading };
};

export default useFetchUnpublishedEvent;

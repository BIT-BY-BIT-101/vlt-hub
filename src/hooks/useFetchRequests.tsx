import {
  collection,
  query,
  or,
  where,
  onSnapshot,
  and,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { EventDataModel } from "../models/Model";
import { AuthContext } from "../context/AuthContext";
import { dA } from "@fullcalendar/core/internal-common";

const useFetchRequests = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState<EventDataModel>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [hostInfo, setHostInfo] = useState();

  useEffect(() => {
    const colRef = collection(db, "requests");
    const q = query(
      colRef,
      and(
        // where("host_id", "==", currentUser?.uid),
        or(
          where("status", "==", "unpublished"),
          where("status", "==", "for verification"),
          where("status", "==", "confirming"),
          where("status", "==", "paying")
        )
      )
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
      console.log(data);

      if (data?.length !== 0) {
        const docref = doc(db, "profiles", data[0].host_id);
      }
    });
    console.log(data);

    return () => unsub();
  }, []);

  return { data, loading, error };
};

export default useFetchRequests;

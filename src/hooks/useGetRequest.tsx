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

const useGetRequest = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState<EventDataModel>([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, "requests");
    const q = query(
      colRef,
      // and(
      //   where("host_id", "==", currentUser?.uid),
      //   or(
      //     where("status", "==", "unpublished"),
      //     where("status", "==", "confirming"),
      //     where("status", "==", "paying")
      //   )
      // )
      or(
        where("status", "==", "unpublished"),
        where("status", "==", "confirming"),
        where("status", "==", "paying")
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
    });
    return () => unsub();
  }, []);

  return { data, loading, error };
};

export default useGetRequest;

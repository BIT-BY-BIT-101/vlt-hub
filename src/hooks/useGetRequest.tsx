import { doc, onSnapshot, getDoc, DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { EventDataModel, UserDataModel } from "../models/Model";

const useGetRequest = (id: string) => {
  const [data, setData] = useState<DocumentData | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const docRef = doc(db, "requests", id);

    const unsubscribe = onSnapshot(
      docRef,
      async (docSnap) => {
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          console.log(data);

          // Fetch related profile data
          const hostRef = doc(db, "profiles", data?.host_id);
          const eventRef = doc(db, "events", data?.event_id);
          const hostSnap = await getDoc(hostRef);
          const eventSnap = await getDoc(eventRef);

          if (hostSnap.exists() && eventSnap.exists()) {
            const hostData = { id: hostSnap.id, ...hostSnap.data() };
            const eventData = { id: eventSnap.id, ...eventSnap.data() };
            console.log({ data, hostData });

            setData({ data, hostData, eventData });
          }

          console.log(data);
        } else {
          setError(new Error("Document does not exist"));
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [id]);

  return { data, error, loading };
};

export default useGetRequest;

import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  FirestoreError,
  DocumentData,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { EventDataModel } from "../models/Model";

const useFetchFacilityEvents = (facilityId: string) => {
  const [data, setData] = useState<DocumentData[]>([]);
  const [error, setError] = useState<FirestoreError | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!facilityId) return;

    setLoading(true);

    console.log(facilityId);

    const colRef = collection(db, "events");
    const q = query(
      colRef,
      where("facility_id", "==", facilityId),
      where("isPublished", "==", true),
      where("date_from", ">=", new Date().toISOString()),
      orderBy("date_from", "desc")
    );

    const unsub = onSnapshot(q, (doc) => {
      const collectionData: any = [];
      try {
        doc.forEach((doc) => {
          collectionData.push({ id: doc.id, ...doc.data() });
        });
        setData(collectionData);
        setLoading(false);
        setError(null);
        console.log("Data Refreshed");
      } catch (err) {
        setError(err as FirestoreError);
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return { data, loading, error };
};

export default useFetchFacilityEvents;

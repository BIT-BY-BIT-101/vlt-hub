import {
  collection,
  query,
  and,
  where,
  or,
  onSnapshot,
  doc,
  getDocs,
  getDoc,
  orderBy,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { EventDataModel } from "../models/Model";
import { set } from "react-hook-form";

const useFetchpublishEvents = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState();
  const [hostInfo, setHostInfo] = useState<string>();
  const [error, setError] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHostData = async (hostId: string) => {
      const hostDocRef = doc(db, "profiles", hostId);
      const hostDocSnap = await getDoc(hostDocRef);
      if (hostDocSnap.exists()) {
        const hostData = hostDocSnap.data();

        return hostData;
      }
      return null;
    };
    const colRef = collection(db, "events");
    const q = query(
      colRef,
      and(
        // where("host_id", "==", currentUser?.uid),
        // where("event_date", ">=", new Date().toISOString()),
        where("date_from", ">=", new Date().toISOString()),
        // or(
        // where("status", "==", "unpublished"),
        // where("status", "==", "for confirmation"),
        // where("status", "==", "rejected"),
        // where("status", "==", "confirming"),
        // where("status", "==", "confirmed"),
        // where("status", "==", "paying"),
        where("isPublished", "==", true)
        // )
      ),
      orderBy("date_from", "desc")
      // where("host_id", "==", currentUser?.uid),
    );

    const unsub = onSnapshot(q, (docs) => {
      try {
        const collectionData: any = [];
        docs.forEach((res) => {
          const eventData = {
            id: res.id,
            ...res.data(),
          };

          if (eventData.host_id) {
            const hostData = getHostData(res.data().host_id);
            const hostInfo = hostData;
          }
          collectionData.push(eventData);
        });

        setData(collectionData);
        setHostInfo(hostInfo);

        setLoading(false);
        console.log("Data Refreshed");
      } catch (error) {
        console.error("Error occured: ", error);
        throw error;
      }
    });
    return () => unsub();
  }, []);

  return { data, hostInfo, error, loading };
};

export default useFetchpublishEvents;

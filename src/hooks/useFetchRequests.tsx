import {
  collection,
  query,
  or,
  where,
  onSnapshot,
  and,
  orderBy,
  DocumentData,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { EventDataModel } from "../models/Model";
import { AuthContext } from "../context/AuthContext";

const useFetchRequests = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState<DocumentData[]>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [hostInfo, setHostInfo] = useState();

  useEffect(() => {
    // const getHostData = async (hostId: string) => {
    //   const hostDocRef = doc(db, "profiles", hostId);
    //   const hostDocSnap = await getDoc(hostDocRef);
    //   if (hostDocSnap.exists()) {
    //     const hostData = hostDocSnap.data();

    //     return hostData;
    //   }
    //   return null;
    // };
    const colRef = collection(db, "requests");
    const q = query(
      colRef,
      and(
        // where("host_id", "==", currentUser?.uid),

        or(where("is_transaction_complete", "==", false))
      ),
      orderBy("updatedAt", "desc")
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

      // if (data?.length !== 0) {
      //   const docref = doc(db, "profiles", data.host_id);
      // }
    });
    console.log(data);

    return () => unsub();
  }, []);

  return { data, loading, error };
};

export default useFetchRequests;

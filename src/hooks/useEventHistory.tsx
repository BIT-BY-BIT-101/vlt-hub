import {
  collection,
  query,
  where,
  getDocs,
  WhereFilterOp,
  FieldPath,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";

/**
 * @param collectionPath - path to the collection
 * @param operatingStr - The operation string (e.g "<", "<=", "==", "<", "<=", "!=").
 * @param value — The value for comparison
 */
const useEventHistory = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const colRef = collection(db, "event");
    const now = Date.now();
    const convertDate = Timestamp.fromDate(new Date());
    const q = query(colRef, where("eventDate", "<", now));

    const unsub = onSnapshot(q, (doc) => {
      // const unsub = onSnapshot(collection(db, collectionPath), (doc) => {
      const collectionData: any = [];
      doc.forEach((doc) => {
        collectionData.push({ id: doc.id, ...doc.data() });
      });
      setData(collectionData);
      setIsLoading(false);
      console.log("current date: ", now);
      console.log("current date: ", convertDate.toDate);

      console.log("Data Refreshed ", collectionData);
    });
    return unsub;
  }, []);

  //   async function queryData() {
  //     const colRef = collection(db, "event");
  //     const now = Date();

  //     // Create a query against the collection.
  //     const q = query(
  //       colRef,
  //       where("eventDate", "<", now),
  //       where("participants", "array-contains", auth.currentUser?.uid)
  //     );
  //     const querySnapshot = await getDocs(q);
  //     const collectionData: any = [];
  //     querySnapshot.forEach((doc) => {
  //       collectionData.push({ id: doc.id, ...doc.data() });
  //       // doc.data() is never undefined for query doc snapshots
  //       // console.log(doc.id, " => ", doc.data());
  //       console.log(collectionData);
  //     });
  //     setData(collectionData);
  //     setIsLoading(false);
  //   }
  //   useEffect(() => {
  //     queryData();
  //   }, []);
  return { data };
};

export default useEventHistory;

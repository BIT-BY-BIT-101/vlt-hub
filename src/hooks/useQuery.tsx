import {
  collection,
  query,
  where,
  getDocs,
  WhereFilterOp,
  FieldPath,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";

/**
 * @param collectionPath - path to the collection
 * @param operatingStr - The operation string (e.g "<", "<=", "==", "<", "<=", "!=").
 * @param value — The value for comparison
 */
const useQuery = (
  collectionPath: string,
  fieldPath: string | FieldPath,
  operatorStr: WhereFilterOp,
  value: string | null
) => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const colRef = collection(db, collectionPath);
    const q = query(colRef, where(fieldPath, operatorStr, value));

    const unsub = onSnapshot(q, (doc) => {
      // const unsub = onSnapshot(collection(db, collectionPath), (doc) => {
      const collectionData: any = [];
      doc.forEach((doc) => {
        collectionData.push({ id: doc.id, ...doc.data() });
      });
      setData(collectionData);
      setIsLoading(false);
      console.log("Data Refreshed");
    });
    return unsub;
  }, []);

  async function queryData() {
    const colRef = collection(db, collectionPath);

    // Create a query against the collection.
    const q = query(colRef, where(fieldPath, operatorStr, value));
    const querySnapshot = await getDocs(q);
    const collectionData: any = [];
    querySnapshot.forEach((doc) => {
      collectionData.push({ id: doc.id, ...doc.data() });
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      console.log(collectionData);
    });
    setData(collectionData);
  }
  useEffect(() => {
    queryData();
  }, []);
  return { queryData, data };
};

export default useQuery;

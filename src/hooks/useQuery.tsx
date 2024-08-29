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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    const colRef = collection(db, collectionPath);
    const q = query(colRef, where(fieldPath, operatorStr, value));

    const unsub = onSnapshot(q, (doc) => {
      // const unsub = onSnapshot(collection(db, collectionPath), (doc) => {
      try {
        const collectionData: any = [];
        doc.forEach((doc) => {
          collectionData.push({ id: doc.id, ...doc.data() });
        });
        setData(collectionData);
        setLoading(false);
        console.log("Data Refreshed");
      } catch (error) {
        console.log("Error occured: ", error);
      } finally {
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  async function queryData() {
    try {
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
      setLoading(false);
    } catch (error) {
      console.log("Error occured: ", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    queryData();
  }, []);
  return { queryData, data, loading, error };
};

export default useQuery;

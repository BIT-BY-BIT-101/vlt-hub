import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";

const useQuery = (collectionPath: string) => {
  const [data, setData] = useState([]);
  async function queryData() {
    const eventRef = collection(db, collectionPath);

    // Create a query against the collection.
    const q = query(eventRef, where("status", "==", "unpublish"));
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

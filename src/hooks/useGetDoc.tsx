import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../config/firebase";

const useGetDoc = (collectionName: string, pathSegment: string[]) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDoc = async () => {
    try {
      const docRef = doc(db, collectionName, ...pathSegment);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setData(docSnap.data());
      }
    } catch (error) {
      setError(error);
      console.log("Error getting document:", error);
    }
  };

  return { data, error, loading };
};

export default useGetDoc;

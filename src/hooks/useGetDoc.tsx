import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";

const useGetDoc = (
  collectionName: string,
  path: string
  // ...pathSegment: string[]
) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDoc = async () => {
    try {
      const docRef = doc(db, collectionName, path);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setData(data);
        setLoading(false);
      } else {
        setError(new Error("Document does not exist"));
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      console.error("Error getting document:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false
    }
  };

  useEffect(() => {
    fetchDoc();
  }, []);

  return { data, error, loading, fetchDoc };
};

export default useGetDoc;

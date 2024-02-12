import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";

const useQueryDoc = (collectionPath: string, pathSegment: string) => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();

  async function getQueryDoc() {
    const docRef = doc(db, collectionPath, pathSegment);
    // const docSnap = await getDoc(docRef);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      try {
        if (doc.exists()) {
          const data = { id: doc.id, ...doc.data() };
          console.log("Document data:", data);
          setData(data);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        setError(error);
      }
    });
  }
  useEffect(() => {
    getQueryDoc();
  }, [collectionPath, pathSegment]);
  return { data, getQueryDoc };
};

export default useQueryDoc;

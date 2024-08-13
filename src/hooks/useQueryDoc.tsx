import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";

const useQueryDoc = (collectionPath: string, ...pathSegment: string[]) => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();

  async function getQueryDoc() {
    const docRef = doc(db, collectionPath, ...pathSegment);
    const docSnap = await getDoc(docRef);

    console.log(docSnap.data());

    try {
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Document data:", data);
        setData(data);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        setData(null);
      }
    } catch (error) {
      setError(error);
      console.log("Error getting document:", error);
    }
  }
  useEffect(() => {
    getQueryDoc();
  }, []);
  return { data, getQueryDoc };
};

export default useQueryDoc;

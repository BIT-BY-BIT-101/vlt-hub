// useFirebaseData.js
import { useState, useEffect } from "react";
import { db } from "../config/firebase"; // Assuming you have a Firebase configuration file
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { EventDataModel } from "../models/Model";

// type FirebaseData = {
//   data: EventDataModel[];
// };

// interface FormsProps extends EventDataModel {
//   data: EventDataModel[];
// }

type FormsProps = EventDataModel;

const useFirestore = (collectionPath: string) => {
  const [data, setData] = useState<FormsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const addData = async (newData: any) => {
    try {
      const collectionRef = collection(db, collectionPath);
      await addDoc(collectionRef, newData);
      console.log("Event added successfully!", collectionRef.id);
      getData();
    } catch (err) {
      setError(err);
      console.error("Error adding event:", err);
    }
  };

  const getData = async () => {
    try {
      const colRef = collection(db, collectionPath);
      const querySnapshot = await getDocs(colRef);

      const collectionData: any = [];
      querySnapshot.forEach((doc) => {
        collectionData.push({ id: doc.id, ...doc.data() });
      });

      setData(collectionData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteData = async (id: string) => {
    try {
      const docRef = doc(db, collectionPath, id);
      await deleteDoc(docRef);
      // Refresh data after deletion
      getData();
    } catch (err) {
      setError(err);
    }
  };

  return { addData, error, data, deleteData, loading };
};

export default useFirestore;

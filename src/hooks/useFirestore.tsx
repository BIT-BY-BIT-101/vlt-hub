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

const useFirestore = (collectionPath: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addData = async (newData: any) => {
    try {
      const collectionRef = collection(db, collectionPath);
      await addDoc(collectionRef, newData);
      console.log("Event added successfully!", collectionRef.id);
    } catch (err) {
      setError(err);
      console.error("Error adding event:", err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const colRef = collection(db, collectionPath);
        const querySnapshot = await getDocs(colRef);

        const collectionData = [];
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

    getData();
  }, []);

  const deleteData = async (id) => {
    try {
      const docRef = doc(db, collectionPath, id);
      await deleteDoc(docRef);
      // Refresh data after deletion
      fetchData();
    } catch (err) {
      setError(err);
    }
  };

  return { addData, error, data, deleteData };
};

export default useFirestore;

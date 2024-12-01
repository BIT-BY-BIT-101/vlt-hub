// useFirebaseData.js
import { useState, useEffect } from "react";
import { auth, db } from "../config/firebase"; // Assuming you have a Firebase configuration file
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { EventDataModel, UserDataModel } from "../models/Model";
import useFirebaseAuth from "./useFirebaseAuth";

// type FirebaseData = {
//   data: EventDataModel[];
// };

// interface FormsProps extends EventDataModel {
//   data: EventDataModel[];
// }

// type FormsProps = EventDataModel;

const useFirestore = (collectionPath: string) => {
  const [data, setData] = useState<any>([]);
  // const [data, setData] = useState<FormsProps[]>([]);
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const addData = async (newData: any) => {
    try {
      const collectionRef = collection(db, collectionPath);
      const snapshot = await addDoc(collectionRef, {
        ...newData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log("Data added successfully!", snapshot.id);
      const newDocId = snapshot.id;
      return newDocId;
      // getData();
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error("Error adding event:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // const getData = async () => {
  //   try {
  //     const colRef = collection(db, collectionPath);
  //     const querySnapshot = await getDocs(colRef);

  //     const collectionData: any = [];
  //     querySnapshot.forEach((doc) => {
  //       collectionData.push({ id: doc.id, ...doc.data() });
  //     });

  //     setData(collectionData);
  //     console.log(collectionData);
  //   } catch (err) {
  //     console.error("Error fetching data:", err);
  //     setError(err);
  //     throw err;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const updateData = async (id: string, data: any, callback?: () => void) => {
    try {
      const docRef = doc(db, collectionPath, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      }).then((result) => {
        console.log("Data updated successfully! ", result);
        if (callback) callback();
        return result;
      });
    } catch (err) {
      setError(err);
      console.error("Error updating data:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const unsub = onSnapshot(collection(db, collectionPath), (doc) => {
  //     const collectionData: any = [];
  //     doc.forEach((doc) => {
  //       collectionData.push({ id: doc.id, ...doc.data() });
  //     });
  //     setData(collectionData);
  //     setLoading(false);
  //     console.log("Data Refreshed");
  //   });
  //   return () => unsub();
  // }, []);

  // useEffect(() => {
  //   // fetchUserData();
  //   getData();
  // }, []);

  const deleteData = async (id: string) => {
    try {
      setLoading(true);
      const docRef = doc(db, collectionPath, id);
      await deleteDoc(docRef);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addData, error, data, deleteData, loading, userData, updateData };
};

export default useFirestore;

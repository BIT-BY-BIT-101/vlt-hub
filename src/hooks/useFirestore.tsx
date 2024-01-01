// useFirebaseData.js
import { useState, useEffect } from "react";
import { db } from "../config/firebase"; // Assuming you have a Firebase configuration file
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

import { EventDataModel, UserDataModel } from "../models/Model";
import useFirebaseAuth from "./useFirebaseAuth";

// type FirebaseData = {
//   data: EventDataModel[];
// };

// interface FormsProps extends EventDataModel {
//   data: EventDataModel[];
// }

type FormsProps = EventDataModel | UserDataModel;

const useFirestore = (collectionPath: string) => {
  const { user } = useFirebaseAuth();
  const [data, setData] = useState<FormsProps[]>([]);
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const addData = async (newData: any) => {
    try {
      const collectionRef = collection(db, collectionPath);
      await addDoc(collectionRef, newData);
      console.log("Data added successfully!", collectionRef.id);
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

  const fetchUserData = async () => {
    try {
      const userEmail = user?.email;
      if (userEmail) {
        const userDocRef = doc(db, "profiles", userEmail);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (id: string, data: any) => {
    const docRef = doc(db, collectionPath, id);
    await updateDoc(docRef, data);
    // Refresh data after update
    fetchUserData();
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, collectionPath), (doc) => {
      const collectionData: any = [];
      doc.forEach((doc) => {
        collectionData.push({ id: doc.id, ...doc.data() });
      });
      setData(collectionData);
      // setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    fetchUserData();
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

  return { addData, error, data, deleteData, loading, userData, updateData };
};

export default useFirestore;

import {
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { EventDataModel, VenueDataModel } from "../models/Model";
import { AuthContext } from "../context/AuthContext";

const useFetchVenueDetails = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState<VenueDataModel | null>(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const getVenueDetails = async () => {
    try {
      const docRef = doc(db, "venues", currentUser?.data.venueId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setData(docSnap.data());
        setLoading(false);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        setData(null);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error getting document:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getVenueDetails();
  }, []);

  return { data, error, loading };
};

export default useFetchVenueDetails;

import {
  collection,
  query,
  and,
  where,
  or,
  onSnapshot,
  getDocs,
  limit,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { EventDataModel } from "../models/Model";
import { getMaximumDate } from "../helpers/DateTimeFunctions";

const useSearchEventQuery = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState<EventDataModel>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const colRef = collection(db, "events");
      const q = query(
        colRef,
        where("event_date", ">=", new Date().toISOString()),
        limit(50)
      );

      try {
        const querySnapshot = await getDocs(q);
        const collectionData: any = [];
        querySnapshot.forEach((doc) => {
          collectionData.push({ id: doc.id, ...doc.data() });
          console.log(doc.id, " => ", doc.data());
          console.log(collectionData);
        });
        setData(collectionData);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching data: ", err);
        throw err;
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { data, error, loading };
};

export default useSearchEventQuery;

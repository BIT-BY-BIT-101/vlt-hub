import {
  collection,
  query,
  and,
  or,
  where,
  orderBy,
  onSnapshot,
  DocumentData,
  doc,
  getDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { EventDataModel } from "../models/Model";
import { D } from "@fullcalendar/core/internal-common";

const useFetchKYCs = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState<DocumentData[] | null>([]);
  const [hostInfo, setHostInfo] = useState<DocumentData[]>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHostData = async (hostId: string) => {
      const hostDocRef = doc(db, "profiles", hostId);
      const hostDocSnap = await getDoc(hostDocRef);
      if (hostDocSnap.exists()) {
        const hostData = hostDocSnap.data();

        return hostData;
      }
      return null;
    };
    const colRef = collection(db, "kyc_sessions");
    const q = query(
      colRef,
      and(
        // where("host_id", "==", currentUser?.uid),

        or(where("is_transaction_complete", "==", false))
      ),
      orderBy("updatedAt", "desc")
    );

    const unsub = onSnapshot(q, (doc) => {
      try {
        const collectionData: any = [];
        doc.forEach(async (doc) => {
          const kycData: DocumentData = { id: doc.id, ...doc.data() };

          if (kycData?.user_id) {
            const hostData = await getHostData(doc.data().user_id);
            setHostInfo(hostData);
            console.log("hostData: ", { kycData, hostData });
            collectionData.push({ kycData, hostData });
          }
        });

        setData(collectionData);
        setHostInfo(hostInfo);
        console.log("Data Refreshed");
      } catch (err) {
        console.error("Error occured: ", err);
        throw err;
      } finally {
        setLoading(false);
      }
    });
    console.log(data);

    return () => unsub();
  }, []);

  return { data, loading, error };
};

export default useFetchKYCs;

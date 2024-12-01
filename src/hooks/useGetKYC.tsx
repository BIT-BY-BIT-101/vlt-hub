import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { UserDataModel } from "../models/Model";

const useGetKYC = (id: string) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const docRef = doc(db, "kyc_sessions", id);

    const unsubscribe = onSnapshot(
      docRef,
      async (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();

          // Fetch related profile data
          const hostRef = doc(db, "profiles", data.user_id);
          const hostSnap = await getDoc(hostRef);

          if (hostSnap.exists()) {
            const hostData = hostSnap.data();
            console.log({ data, hostData });

            setData({ data, hostData });
          }
        } else {
          setError(new Error("Document does not exist"));
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [id]);

  return { data, error, loading };
};

export default useGetKYC;

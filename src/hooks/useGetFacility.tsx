import { DocumentData, doc, onSnapshot, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { UserDataModel } from "../models/Model";

const useGetFacility = (id: string) => {
  const [data, setData] = useState<DocumentData | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hostInfo, setHostInfo] = useState<UserDataModel | null>(null);
  const [venueinfo, setVenueInfo] = useState();
  const [facilityInfo, setFacilityInfo] = useState();

  useEffect(() => {
    if (!id) return;

    const docRef = doc(db, "facilities", id);

    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      try {
        // const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };

          //   const hostRef = doc(db, "profiles", data.host_id);
          //   const hostSnap = await getDoc(hostRef);
          // const venueRef = doc(db, "venue", data.venue_id);
          // const venueSnap = await getDoc(venueRef);
          // const facilityRef = doc(db, "facility", data.facility_id);
          // const facilitySnap = await getDoc(facilityRef);

          //   if (hostSnap.exists()) {
          //     const hostData = hostSnap.data();
          //     setHostInfo(hostData);
          //     setLoading(true);
          //   }

          // if (venueSnap.exists()) {
          //   const venueData = venueSnap.data();
          //   setVenueInfo(venueData);
          // }

          // if (facilitySnap.exists()) {
          //   const facilityData = facilitySnap.data();
          //   setFacilityInfo(facilityData);
          // }
          setData(data);
          setLoading(false);
        } else {
          setError(new Error("Document does not exist"));
        }
      } catch (error) {
        setError(error);
        throw error;
        console.error("Error getting document:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { data, hostInfo, error, loading };
};

export default useGetFacility;

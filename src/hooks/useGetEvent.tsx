import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { EventDataModel, UserDataModel } from "../models/Model";

const useGetEvent = (path: string) => {
  const [data, setData] = useState<EventDataModel | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hostInfo, setHostInfo] = useState<UserDataModel | null>(null);
  const [venueinfo, setVenueInfo] = useState();
  const [facilityInfo, setFacilityInfo] = useState();

  const fetchDoc = async () => {
    try {
      const docRef = doc(db, "events", path);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);

        const hostRef = doc(db, "profiles", data.host_id);
        const hostSnap = await getDoc(hostRef);
        // const venueRef = doc(db, "venue", data.venue_id);
        // const venueSnap = await getDoc(venueRef);
        // const facilityRef = doc(db, "facility", data.facility_id);
        // const facilitySnap = await getDoc(facilityRef);

        if (hostSnap.exists()) {
          const hostData = hostSnap.data();
          setHostInfo(hostData);
          setLoading(true);
        }

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
  };

  useEffect(() => {
    fetchDoc();
  }, []);

  return { data, hostInfo, venueinfo, facilityInfo, error, loading, fetchDoc };
};

export default useGetEvent;

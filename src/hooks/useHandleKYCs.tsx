import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useFirestore from "./useFirestore";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useHistory } from "react-router";

const useHandleKYCs = () => {
  const { currentUser } = useContext(AuthContext);
  const { addData: createSession, updateData: updateSession } =
    useFirestore("kyc_sessions");
  const { updateData: updateProfile } = useFirestore("profiles");
  const history = useHistory();

  async function handleCreateKYCSession(newData: any) {
    try {
      await createSession({
        // ...newData,
        user_id: currentUser?.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }).then(async (result) => {
        await updateProfile(currentUser?.uid, {
          kyc_session_id: result,
          updatedAt: serverTimestamp(),
        });
      });

      console.log("KYC session created successfully!");

      window.location.href = "host/kyc/verify";
    } catch (error) {
      console.error("Error creating KYC session:", error);
      throw error;
    } finally {
    }
  }

  async function handleUpdateKYCSession(data: any) {
    try {
      const kycSessionId = currentUser?.data.kyc_session_id;
      await updateSession(kycSessionId, data);
      console.log("KYC session updated successfully!");
    } catch (error) {
      console.error("Error updating KYC session:", error);
      throw error;
    } finally {
    }
  }

  return { handleCreateKYCSession, handleUpdateKYCSession };
};

export default useHandleKYCs;

import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { auth } from "../../config/firebase";
import useFirestore from "../../hooks/useFirestore";
import { arrayUnion } from "firebase/firestore";
type RouteParams = {
  id: string;
};
const SuccessPage = () => {
  const { id } = useParams<RouteParams>();
  const { updateData: updateEnrolled } = useFirestore("profiles");
  const { updateData: updateParticipants } = useFirestore("events");
  const userId = auth.currentUser?.uid;
  const history = useHistory();

  const handleUpdates = async () => {
    if (!id || !userId) return;

    try {
      await updateParticipants(id, {
        participants: arrayUnion(userId),
      });
      await updateEnrolled(userId, {
        registered_events: arrayUnion(id),
      });
      console.log("Registration status updated successfully!");
      history.push("/participant/events");
      window.location.href = "/participant/events";
    } catch (error) {
      console.error("Error updating registration status:", error);
    }
  };

  useEffect(() => {
    handleUpdates();
  }, []);
  return (
    <IonPage>
      <IonContent>
        <h1>Payment Success</h1>
      </IonContent>
    </IonPage>
  );
};

export default SuccessPage;

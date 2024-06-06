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

  useEffect(() => {
    console.log(id);

    const handleUpdates = async () => {
      await updateParticipants(id!, {
        participants: arrayUnion(userId),
      });
      await updateEnrolled(userId, {
        registered_events: arrayUnion(id),
      });
    };

    history.push("/participant");
    window.location.href = "/participant";

    return () => handleUpdates();
  }, [id]);

  return (
    <IonPage>
      <IonContent>
        <h1>Payment Success</h1>
      </IonContent>
    </IonPage>
  );
};

export default SuccessPage;

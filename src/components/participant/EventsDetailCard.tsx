import {
  IonButton,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { useEffect, useState } from "react";
import {
  formatDateString,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
import { useParams } from "react-router";
import { EventDataModel } from "../../models/Model";
import { arrayUnion, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import HostImg from "../../assets/host.jpg";
import useFirestore from "../../hooks/useFirestore";

type RouteParams = {
  id: string;
};

const EventsDetailCard = () => {
  const [selected, setSelected] = useState<any>({});
  const { id } = useParams<RouteParams>();
  // const { id } = useParams<EventDataModel>();
  const { updateData: updateEnrolled } = useFirestore("profiles");
  const { updateData: updateParticipants } = useFirestore("events");
  const { addData } = useFirestore("event_enrolled");

  async function getData() {
    const docRef = doc(db, `events/${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const data = docSnap.data();
      setSelected(data);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleRegister = async () => {
    const userId = auth.currentUser?.uid!;
    const newData = {
      host_id: selected?.host_id,
      user_id: userId,
      event_id: id,
    };
    await addData(newData);
    console.log(newData);

    await updateParticipants(id, {
      participants: arrayUnion(userId),
    });
    await updateEnrolled(userId, {
      registered_events: arrayUnion(id),
    });
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{selected?.title || ""}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div>
          <h2>
            {/* Mastering the Fundamentals: An Introduction to Visual C# Programming */}
            {selected?.title || ""}
          </h2>
        </div>
        <div>
          <IonImg
            src={HostImg}
            alt="HostImg"
            className="phome-modal-host-img"
          />
          <p>{selected?.host_name}</p>
        </div>
        <div>
          <p>
            <span className="labels">Description:</span>{" "}
            {selected?.description || "NONE"}
          </p>
          <p>
            <span className="labels">Venue:</span>
            {selected?.venue}
          </p>
          <p>
            <span className="labels">Date:</span>
            {formatDateString(selected?.eventDate)}
          </p>
          <p>
            <span className="labels">Time:</span>{" "}
            {formatTimeString(selected?.startTime!)} -
            {formatTimeString(selected?.endTime!)}
          </p>
        </div>
        <div className="phome-btn-container">
          <IonButton
            expand="block"
            className="phome-register-btn"
            onClick={handleRegister}
          >
            Register
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default EventsDetailCard;

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonImg,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { formatDateString, formatTimeString } from "../../functions/functions";
import { useParams } from "react-router";
import { EventDataModel } from "../../models/Model";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import HostImg from "../../assets/host.jpg";

const EventsDetailCard = () => {
  const [selected, setSelected] = useState<any>({});
  const { id } = useParams<EventDataModel>();

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

  return (
    <>
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
              <span>Description:</span> {selected?.description || "NONE"}
            </p>
            <p>
              <span>Venue:</span>
              {selected?.venue}
            </p>
            <p>
              <span>Date:</span>
              {formatDateString(selected?.eventDate)}
            </p>
            <p>
              <span>Time:</span> {formatTimeString(selected?.startTime!)} -
              {formatTimeString(selected?.endTime!)}
            </p>
          </div>
          <div className="phome-btn-container">
            <IonButton expand="block" className="phome-register-btn">
              Register
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default EventsDetailCard;

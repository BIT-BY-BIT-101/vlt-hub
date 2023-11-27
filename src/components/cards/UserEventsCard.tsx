import React, { useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import IntrotoCSharp from "../../assets/introtocsharp.jpg";
import { IonCard, IonImg, IonLabel, IonModal } from "@ionic/react";

const UserEventsCard = () => {
  const { data } = useFirestore("user_events");
  const [showEventDetails, setShowEventDetails] = useState(false);
  return (
    <IonCard
      className="phome-event-card"
      onClick={() => {
        setShowEventDetails(true);
      }}
    >
      <IonImg
        src={IntrotoCSharp}
        alt="Mastering the Fundamentals: An Introduction to Visual C# Programming."
        className="phome-event-image"
      />
      <IonLabel>
        <h2 className="phome-event-title">
          Mastering the Fundamentals: An Introduction to Visual C# Programming
        </h2>
        <IonLabel className="phome-event-details">
          <p>
            <span>Date:</span> October 15, 2023
          </p>
          <p>
            <span>Venue:</span> Zoom
          </p>
        </IonLabel>
      </IonLabel>
      <IonModal isOpen={showEventDetails}></IonModal>
    </IonCard>
  );
};

export default UserEventsCard;

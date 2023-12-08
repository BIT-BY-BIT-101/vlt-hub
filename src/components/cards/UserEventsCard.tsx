import { IonCard, IonImg, IonLabel, IonModal } from "@ionic/react";
import React, { useState } from "react";
import IntrotoCSharp from "../../assets/introtocsharp.jpg";
import useFirestore from "../../hooks/useFirestore";

const UserEventsCard = () => {
  const { data } = useFirestore("user_events");
  const [showEventDetails, setShowEventDetails] = useState(false);
  return (
    <IonCard className="phome-event-card">
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
            <span>Venue:</span> Zoom
          </p>
          <p>
            <span>Date:</span> October 15, 2023
          </p>
          <p>
            <span>Time:</span> 3:00 PM - 5:00 PM
          </p>
        </IonLabel>
      </IonLabel>
    </IonCard>
  );
};

export default UserEventsCard;

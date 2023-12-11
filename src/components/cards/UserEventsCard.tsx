import { IonCard, IonImg, IonLabel, IonModal } from "@ionic/react";
import React, { useState } from "react";
import IntrotoCSharp from "../../assets/introtocsharp.jpg";
import useFirestore from "../../hooks/useFirestore";
import Default from "../../assets/defaultCover.jpg";
import HostImg from "../../assets/host.jpg";

type UserEventModalProps = {
  onOpen: () => void;
};

const UserEventsCard: React.FC<UserEventModalProps> = ({ onOpen }) => {
  const { data } = useFirestore("user_events");
  const [showEventDetails, setShowEventDetails] = useState(false);
  return (
    <IonCard className="phome-event-card" onClick={onOpen}>
      <IonImg
        src={Default}
        alt="Mastering the Fundamentals: An Introduction to Visual C# Programming."
        className="phome-event-image"
      />
      <IonLabel>
        <h2
          className="phome-event-title"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            lineHeight: "20px",
            maxHeight: "40px",
          }}
        >
          Mastering the Fundamentals: An Introduction to Visual C# Programming
        </h2>
        <div className="phome-event-host-container">
          <IonImg
            src={HostImg}
            alt="Abdul Rauf M. Sultan"
            className="phome-event-host-img"
          />
          <p className="phome-event-host">Abdul Rauf M. Sultan</p>
        </div>
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
          <p className="phome-event-free">Free</p>
        </IonLabel>
      </IonLabel>
    </IonCard>
  );
};

export default UserEventsCard;

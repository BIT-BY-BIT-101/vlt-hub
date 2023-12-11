import { IonCard, IonImg, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import Default from "../../assets/defaultCover.jpg";
import HostImg from "../../assets/host.jpg";
import EventsModal from "../modals/EventsModal";

// type UserEventModalProps = {
//   onOpen: () => void;
// };

const EventsCard = () => {
  const { data: eventsData } = useFirestore("events");
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <>
      <IonCard className="phome-event-card" onClick={openModal}>
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
      <EventsModal isOpen={showModal} onDidDismiss={closeModal} />
    </>
  );
};

export default EventsCard;

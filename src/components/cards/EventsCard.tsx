import { IonCard, IonImg, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import Default from "../../assets/defaultCover.jpg";
import HostImg from "../../assets/host.jpg";
import EventsModal from "../modals/EventsModal";
import { EventDataModel } from "../../models/Model";

// type UserEventModalProps = {
//   onOpen: () => void;
// };

const EventsCard = () => {
  const { data } = useFirestore("events");
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({});

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  function formatDateString(originalDateString: string) {
    const dateObject = new Date(originalDateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return dateObject.toLocaleDateString("en-US", options);
  }

  function formatTimeString(originalTimeString: string) {
    const timeObject = new Date(originalTimeString);
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
    };
    return timeObject.toLocaleTimeString("en-US", options);
  }

  return (
    <>
      {data.map((event) => (
        <IonCard
          key={event.id}
          className="phome-event-card"
          // onClick={openModal}
          onClick={() => {
            setShowModal(true);
            setSelected(event);
          }}
        >
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
              {event.title}
            </h2>
            <div className="phome-event-host-container">
              <IonImg
                src={HostImg}
                alt="Abdul Rauf M. Sultan"
                className="phome-event-host-img"
              />
              <p className="phome-event-host">{event.host_name}</p>
            </div>
            <IonLabel className="phome-event-details">
              <p>
                <span>Venue:</span> {event.venue}
              </p>
              <p>
                <span>Date:</span>
                {formatDateString(event.eventDate)}
              </p>
              <p>
                <span>Time:</span> {formatTimeString(event.startTime)} -{" "}
                {formatTimeString(event.endTime)}
              </p>
              <p className="phome-event-free">Free</p>
            </IonLabel>
          </IonLabel>
        </IonCard>
      ))}
      <EventsModal
        isOpen={showModal}
        onDidDismiss={closeModal}
        selected={selected}
      />
    </>
  );
};

export default EventsCard;

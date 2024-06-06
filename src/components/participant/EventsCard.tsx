import { IonCard, IonCol, IonImg, IonLabel } from "@ionic/react";
import { useState } from "react";
import Default from "../../assets/defaultCover.jpg";
import HostImg from "../../assets/host.jpg";
import { EventDataModel } from "../../models/Model";
import { useHistory } from "react-router";
import useQuery from "../../hooks/useQuery";
import useFirestore from "../../hooks/useFirestore";
import EventsModal from "../modals/EventsModal";
import {
  convertToCurrency,
  formatDateString,
  formatTimeString,
} from "../../functions/functions";

// type UserEventModalProps = {
//   onOpen: () => void;
// };

const EventsCard = () => {
  // const { data } = useFirestore("events");
  const { data } = useQuery("events", "status", "==", "published");
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({});
  const history = useHistory();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // function formatDateString(originalDateString: string) {
  //   const dateObject = new Date(originalDateString);
  //   const options: Intl.DateTimeFormatOptions = {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   };
  //   return dateObject.toLocaleDateString("en-US", options);
  // }

  // function formatTimeString(originalTimeString: string) {
  //   const timeObject = new Date(originalTimeString);
  //   const options: Intl.DateTimeFormatOptions = {
  //     hour: "numeric",
  //     minute: "numeric",
  //   };
  //   return timeObject.toLocaleTimeString("en-US", options);
  // }

  return (
    <>
      {data.map((event: EventDataModel) => (
        // <IonCol size="12" size-sm="3">
        <IonCard
          key={event.id}
          className="phome-event-card"
          // onClick={openModal}
          // onClick={() => history.push(`/participant/event/details/${event.id}`)}
          onClick={() => {
            setShowModal(true);
            setSelected(event);
          }}
        >
          <IonImg
            src={event.imgUrl ? event.imgUrl : Default}
            alt={event.title}
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
              {/* <p className="phome-event-free">Free</p> */}
              <p
                className={
                  event.event_fee ? "phome-event-paid" : "phome-event-free"
                }
              >
                {event.event_fee ? `PHP ${event.event_fee}` : "Free"}
              </p>
            </IonLabel>
          </IonLabel>
        </IonCard>
        // </IonCol>
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

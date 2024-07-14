import {
  IonCard,
  IonCol,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonTab,
  IonText,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import Default from "../../assets/defaultCover.jpg";
import HostImg from "../../assets/host.jpg";
import {
  formatDateString,
  // formatFibaseTimestamp,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
import useFirestore from "../../hooks/useFirestore";
import useQuery from "../../hooks/useQuery";
import { EventDataModel } from "../../models/Model";
import EventsModal from "../modals/EventsModal";
import "./EventsCard.css";
import { addCircleOutline, homeOutline, timeOutline } from "ionicons/icons";

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
  return (
    <>
      {data.map((event: EventDataModel) => (
        <IonCol size="auto" size-md="6" size-lg="3" sizeXs="10" key={event.id}>
          <IonCard
            className="event-card bg-color-main"
            // onClick={openModal}
            // onClick={() => history.push(`/participant/event/details/${event.id}`)}
            onClick={() => {
              setShowModal(true);
              setSelected(event);
            }}
          >
            <IonItem className="item-color">
              <IonImg
                src={event.imgUrl ? event.imgUrl : Default}
                alt={event.title}
                className="event-card-image"
              />
            </IonItem>
            <IonItem className="item-color">
              <IonLabel>
                <h2>{event.title}</h2>
                <div>
                  <p>{event.host_name}</p>
                </div>
              </IonLabel>
            </IonItem>

            <IonItem className="item-color-dark">
              <IonIcon
                className="text-color-dark"
                icon={homeOutline}
                slot="start"
              />
              <IonText>{event.venue}</IonText>
            </IonItem>
            <IonItem className="item-color-dark">
              <IonIcon
                className="text-color-dark"
                icon={timeOutline}
                slot="start"
              />
              <IonText>{formatTimeString(event.eventDate)}</IonText>
            </IonItem>
            <IonItem className="item-color">
              <IonLabel>
                <p
                  className={`${
                    event.event_fee ? "phome-event-paid" : "phome-event-free"
                  }`}
                >
                  {event.event_fee ? `PHP ${event.event_fee}` : "Free"}
                </p>
              </IonLabel>
            </IonItem>
          </IonCard>
        </IonCol>
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

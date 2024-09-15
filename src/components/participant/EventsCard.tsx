import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonSkeletonText,
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
  // const { data } = useQuery("events", "status", "==", "published");
  const { data, loading, error } = useFirestore("events");
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<EventDataModel>();
  const history = useHistory();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  console.log(data);

  return (
    <>
      {loading ? (
        <IonSkeletonText animated style={{ width: "100%", height: "100%" }} />
      ) : (
        <>
          {data.length !== 0 ? (
            data.map((event: EventDataModel) => (
              <IonCol
                size="auto"
                sizeXs="12"
                sizeMd="4"
                sizeLg="2"
                key={event.id}
              >
                <div
                  className="card"
                  // onClick={openModal}
                  onClick={() =>
                    history.push(`/participant/event/details/${event.id}`)
                  }
                  // onClick={() => {
                  //   setShowModal(true);
                  //   setSelected(event);
                  // }}
                >
                  <IonImg
                    src={event.imageUrl ? event.imageUrl : Default}
                    alt={event.title}
                    // className="event-card-image"
                    className="poster-img"
                  />
                  <IonItem className="item-color"></IonItem>

                  <IonCardHeader className="card-header">
                    <IonCardTitle
                      className="card-title f-weight-bold"
                      // style={{ fontSize: getFontSizeForTitle(event.title) }}
                    >
                      {/* {event.title.slice(0, 100)}{" "} */}
                      {/* Replace '20' with the desired length */}
                      {/* {event.title.length > 100 && "..."}{" "} */}
                      {/* Add ellipsis if title is longer */}
                      {event.title}
                    </IonCardTitle>
                  </IonCardHeader>

                  <IonItem className="item-color-dark">
                    <IonIcon
                      className="text-color-dark"
                      icon={timeOutline}
                      slot="start"
                    />
                    <IonText>{formatDateString(event.event_date)}</IonText>
                  </IonItem>
                  <IonItem className="item-color">
                    <IonLabel>
                      <p
                        className={`${
                          event.event_fee
                            ? "phome-event-paid"
                            : "phome-event-free"
                        }`}
                      >
                        {event.event_fee ? `PHP ${event.event_fee}` : "Free"}
                      </p>
                    </IonLabel>
                  </IonItem>
                </div>
              </IonCol>
            ))
          ) : (
            <IonItem className="item-bg-none">
              There is no current Event Available
            </IonItem>
          )}
        </>
      )}

      <EventsModal
        isOpen={showModal}
        onDidDismiss={closeModal}
        selected={selected}
      />
    </>
  );
};

export default EventsCard;

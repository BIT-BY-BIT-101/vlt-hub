import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
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
import useFetchpublishEvents from "../../hooks/useFetchpublishEvents";

// type UserEventModalProps = {
//   onOpen: () => void;
// };

const EventsCard = () => {
  // const { data } = useQuery("events", "status", "==", "published");
  // const { data, loading, error } = useFirestore("events");
  const { data, loading, error, hostInfo } = useFetchpublishEvents();
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<EventDataModel>();
  const history = useHistory();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  console.log(data);
  // console.log(hostInfo);

  return (
    <>
      {loading ? (
        <IonSkeletonText animated style={{ width: "100%", height: "100%" }} />
      ) : (
        <>
          {data?.length !== 0 ? (
            data?.map((event: EventDataModel) => (
              <IonCol
                size="auto"
                sizeXs="12"
                sizeMd="4"
                sizeLg="3"
                key={event.id}
                style={{ marginBottom: "20px" }}
              >
                <div
                  className="card ion-margin-left ion-margin-right"
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
                  <IonItem className="item-bg-none">
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

                  <IonCardHeader
                    className="card-header"
                    style={{ paddingTop: "0px", paddingBottom: "0px" }}
                  >
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
                    <IonCardSubtitle color={"dark"}>
                      {event.host_name}
                    </IonCardSubtitle>
                  </IonCardHeader>

                  <IonList
                    className="item-bg-none"
                    style={{ paddingTop: "0px", paddingBottom: "0px" }}
                  >
                    <IonItem className="item-color-dark">
                      <IonIcon
                        className="text-color-dark ion-margin-end"
                        icon={timeOutline}
                        // slot="icon-only"
                      />
                      <IonLabel>
                        <p>{formatDateString(event.event_date)}</p>
                      </IonLabel>
                    </IonItem>
                  </IonList>
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

      {/* <EventsModal
        isOpen={showModal}
        onDidDismiss={closeModal}
        selected={selected}
      /> */}
    </>
  );
};

export default EventsCard;

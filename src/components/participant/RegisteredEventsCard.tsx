import {
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonModal,
  IonToolbar,
  IonSearchbar,
  IonThumbnail,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React, { useState } from "react";
import {
  formatDateString,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
import { EventDataModel } from "../../models/Model";
import { closeCircle } from "ionicons/icons";
import { auth } from "../../config/firebase";
import useQuery from "../../hooks/useQuery";
import HostImg from "../../assets/host.jpg";
import EventsModal from "../modals/EventsModal";
import "./RegisteredEventsCard.css";
import useGetDoc from "../../hooks/useGetDoc";
import RegisteredEventsModal from "../modals/RegisteredEventsModal";
import Loader from "../loaders/Loader";

const RegisteredEventsCard = () => {
  const {
    data: events,
    error,
    loading,
  } = useQuery(
    "events",
    "participants",
    "array-contains",
    auth.currentUser?.uid!
  );
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const openModal = (event: EventDataModel) => {
    setSelected(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelected(null);
    setShowModal(false);
  };

  const filteredEvents = searchText
    ? events.filter((event: EventDataModel) =>
        event.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : events;

  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      console.log("Event canceled!");
    }

    setShowConfirmationModal(false);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {/* <IonSearchbar
        className="psearch-bar"
        placeholder="Search events"
        onIonChange={handleSearchChange}
      ></IonSearchbar> */}
      {filteredEvents.map((event: EventDataModel, index: number) => (
        <IonCol size="auto" size-md="6" size-lg="3" sizeXs="10" key={index}>
          <>
            {/* <h1 className="pevent-date">
                      {formatDateString(event.eventDate)}
                    </h1> */}
            <IonCard
              className="bg-color-main pevent-card cursor-pointer"
              // onClick={() => openModal(event)}
              routerLink={`/participant/event/details/${event.id}`}
            >
              {/* <IonCardHeader></IonCardHeader> */}
              <IonItem className="item-color">
                <IonImg
                  src={event.imageUrl ? event.imageUrl : Default}
                  alt={event.title}
                  className="event-card-image"
                />
              </IonItem>
              {/* <IonCardContent className="pevent-card-content"> */}

              {/* <IonThumbnail>
                  <img src={event.userImg || HostImg} alt="Host Image" />
                </IonThumbnail> */}

              <IonItem className="item-color">
                <IonCardTitle className="text-color-dark f-size-auto">
                  <IonLabel>{event.title}</IonLabel>
                </IonCardTitle>
              </IonItem>

              <IonItem className="item-color">
                <IonLabel>
                  <p>
                    <span className=" text-color-rgb">Host: </span>
                    {event.host_name}
                  </p>
                </IonLabel>
              </IonItem>
              <IonItem className="item-color">
                <IonLabel>
                  <p>
                    <span className=" text-color-rgb">Date: </span>
                    {formatDateString(event.event_date)}
                  </p>
                </IonLabel>
              </IonItem>

              {/* <IonItem className="item-color">
                <IonButtons>
                  <IonButton
                    className="btn-primary"
                    onClick={() => openModal(event)}
                  >
                    View
                  </IonButton>
                </IonButtons>
              </IonItem> */}
              {/* </IonCardContent> */}
            </IonCard>
            {/* <RegisteredEventsModal
              isOpen={showModal}
              onDidDismiss={closeModal}
              selected={selected}
            /> */}
          </>
        </IonCol>
      ))}

      {/* <IonModal
        isOpen={showConfirmationModal}
        onDidDismiss={() => setShowConfirmationModal(false)}
        className="pevent-confirmation-modal-container"
      >
        <IonContent className="pevent-confirmation-modal-content">
          <h2 className="pevent-confirmation-modal-txt">Are you sure?</h2>
          <div className="pevent-modal-btn-container">
            <IonButton
              expand="block"
              className="pyes-btn"
              onClick={() => handleConfirmation(true)}
            >
              Yes
            </IonButton>
            <IonButton
              expand="block"
              className="pno-btn"
              onClick={() => handleConfirmation(false)}
            >
              No
            </IonButton>
          </div>
        </IonContent>
      </IonModal> */}
    </>
  );
};

export default RegisteredEventsCard;

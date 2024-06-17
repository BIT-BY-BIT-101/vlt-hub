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
import { formatDateString, formatTimeString } from "../../functions/functions";
import { EventDataModel } from "../../models/Model";
import { closeCircle } from "ionicons/icons";
import { auth } from "../../config/firebase";
import useQuery from "../../hooks/useQuery";
import HostImg from "../../assets/host.jpg";
import EventsModal from "../modals/EventsModal";
import "./RegisteredEventsCard.css";

const RegisteredEventsCard = () => {
  const { data: events } = useQuery(
    "events",
    "participants",
    "array-contains",
    auth.currentUser?.uid!
  );
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showPoster, setShowPoster] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleSearchChange = (e: CustomEvent) => {
    setSearchText(e.detail.value);
  };

  const openModal = (event: EventDataModel) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setShowModal(false);
  };

  const handleCancelClick = () => {
    setShowConfirmationModal(true);
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
  return (
    <>
      <IonSearchbar
        className="psearch-bar"
        placeholder="Search events"
        onIonChange={handleSearchChange}
      ></IonSearchbar>
      {filteredEvents.map((event: EventDataModel, index: number) => (
        <IonCol size="12" size-sm="6" key={index}>
          <React.Fragment>
            {/* <h1 className="pevent-date">
                      {formatDateString(event.eventDate)}
                    </h1> */}
            <IonCard className="bg-color-main pevent-card">
              <IonCardHeader>
                <IonCardTitle className="text-color-dark f-size-auto">
                  <IonLabel>{event.title}</IonLabel>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="pevent-card-content">
                {/* <IonThumbnail>
                  <img src={event.userImg || HostImg} alt="Host Image" />
                </IonThumbnail> */}

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
                      {formatDateString(event.eventDate)}
                    </p>
                  </IonLabel>
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
                  <IonButtons>
                    <IonButton
                      className="btn-primary"
                      onClick={() => openModal(event)}
                    >
                      View
                    </IonButton>
                  </IonButtons>
                  {/* <IonButton
                            className="pcancel-btn"
                            onClick={handleCancelClick}
                          >
                            Cancel
                          </IonButton> */}
                </IonItem>
              </IonCardContent>
            </IonCard>
          </React.Fragment>
        </IonCol>
      ))}

      {/* Modal */}
      <IonModal
        isOpen={showModal}
        onDidDismiss={() => {
          closeModal();
          setShowPoster(false);
        }}
        className="pevent-modal-container"
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton onClick={closeModal}>
                <IonIcon icon={closeCircle} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="pevent-modal-content">
          {selectedEvent && (
            <div>
              <div className="pevent-modal-header">
                <p className="pevent-modal-free">Free</p>
                <IonButton
                  className="pevent-view-poster-btn"
                  onClick={() => setShowPoster(!showPoster)}
                >
                  {showPoster ? "Hide Poster" : "View Poster"}
                </IonButton>
              </div>
              {showPoster && (
                <IonImg
                  src={selectedEvent.imgUrl}
                  alt="Poster"
                  className="pevent-poster-img"
                />
              )}
              <h2 className="pevent-modal-title">{selectedEvent.title}</h2>

              <IonItem className="item-color">
                <IonThumbnail slot="start">
                  <img src={HostImg} alt="Abdul Rauf M. Sultan" />
                </IonThumbnail>
                <p className="pevent-modal-host">{selectedEvent.host_name}</p>
              </IonItem>
              <IonItem className="item-color">
                <p>
                  <span className="text-color-rgb">Date: </span>
                  {formatDateString(selectedEvent.eventDate)}
                </p>
              </IonItem>
              <IonItem className="item-color">
                <IonLabel className="ion-text-wrap">
                  <span>Description:</span>
                  <br />
                  <p>{selectedEvent.description}</p>
                </IonLabel>
              </IonItem>
              <div className="pevent-modal-details">
                <p>
                  <span>Venue:</span> {selectedEvent.venue}
                </p>
                <p>
                  <span>Time:</span> {formatTimeString(selectedEvent.startTime)}{" "}
                  {formatTimeString(selectedEvent.endTime)}
                </p>
              </div>
            </div>
          )}

          <div className="pevent-modal-btn-container">
            <IonButton expand="block" className="pevent-registered-btn">
              Registered
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      {/* Confirmation Modal */}
      <IonModal
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
      </IonModal>
    </>
  );
};

export default RegisteredEventsCard;

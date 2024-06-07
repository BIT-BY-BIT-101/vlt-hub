import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import HostImg from "../../assets/host.jpg";
import HostImg2 from "../../assets/host2.jpg";
import MetaSafety from "../../assets/metasafety.jpg";
import ParticipantNavMenu from "../../components/menus/ParticipantNavMenu";
import "./ParticipantEventPage.css";
import useFirestore from "../../hooks/useFirestore";
import useQuery from "../../hooks/useQuery";
import { auth, db } from "../../config/firebase";
import { EventDataModel } from "../../models/Model";
import { formatDateString, formatTimeString } from "../../functions/functions";
import { doc, getDoc } from "firebase/firestore";

const ParticipantEventPage: React.FC = () => {
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

  const openModal = (event: any) => {
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

  // const events = [
  //   {
  //     date: "Wednesday, November 29, 2023",
  //     title:
  //       "Meta Safety in the Modern Age - Strategies for a Secure Digital Journey",
  //     hostname: "Abdul Rauf M. Sultan",
  //     hostImg: HostImg,
  //     venue: "Zoom",
  //     time: "1:00PM - 3:00PM",
  //   },
  //   {
  //     date: "Friday, December 1, 2023",
  //     title: "#TechyThursdays - Introduction to Web 3.0",
  //     hostname: "Jean Irish Mer",
  //     hostImg: HostImg2,
  //     venue: "Zoom",
  //     time: "3:00PM - 5:00PM",
  //   },
  // ];

  const filteredEvents = searchText
    ? events.filter((event) =>
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
      <ParticipantNavMenu />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>
            {/* <IonMenuButton slot="start" /> */}
            <IonTitle>My Events</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="phome-main">
          <IonSearchbar
            className="psearch-bar"
            placeholder="Search events"
            onIonChange={handleSearchChange}
          ></IonSearchbar>
          <IonGrid>
            <IonRow>
              {filteredEvents.map((event: EventDataModel, index) => (
                <IonCol size="12" size-md="6">
                  <React.Fragment key={index}>
                    {/* <h1 className="pevent-date">
                      {formatDateString(event.eventDate)}
                    </h1> */}
                    <IonCard className="pevent-card">
                      <IonCardHeader>
                        <IonCardTitle>{event.title}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <div className="pevent-host-info">
                          <img
                            src={event.hostImg}
                            alt={`Host: ${event.host_name}`}
                            className="pevent-host-img"
                          />
                          <div className="pevent-host-name">
                            {event.host_name}
                          </div>
                        </div>
                        <div className="pevent-venue">
                          <span>Venue: </span>
                          {event.venue}
                        </div>
                        <div className="pevent-time">
                          <span>Time: </span>
                          {formatTimeString(event.startTime)} -{" "}
                          {formatTimeString(event.endTime)}
                        </div>
                        <div className="peventcard-btn">
                          <IonButton
                            className="pview-btn"
                            onClick={() => openModal(event)}
                          >
                            View
                          </IonButton>
                          {/* <IonButton
                            className="pcancel-btn"
                            onClick={handleCancelClick}
                          >
                            Cancel
                          </IonButton> */}
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </React.Fragment>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>

          {/* Modal */}
          <IonModal
            isOpen={showModal}
            onDidDismiss={() => {
              closeModal();
              setShowPoster(false);
            }}
            // className="pevent-modal-container"
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

                  <div className="pevent-modal-host-container">
                    <IonImg
                      src={HostImg}
                      alt="Abdul Rauf M. Sultan"
                      className="pevent-modal-host-img"
                    />
                    <p className="pevent-modal-host">
                      {selectedEvent.host_name}
                    </p>
                  </div>
                  <div className="pevent-modal-details">
                    <p>
                      <span>Description:</span> {selectedEvent.description}
                    </p>
                    <p className="pevent-modal-date">
                      <span>Date:</span>
                      {formatDateString(selectedEvent.eventDate)}
                    </p>
                    <p>
                      <span>Host:</span> {selectedEvent.hostname}
                    </p>
                    <p>
                      <span>Venue:</span> {selectedEvent.venue}
                    </p>
                    <p>
                      <span>Time:</span>{" "}
                      {formatTimeString(selectedEvent.startTime)}{" "}
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
        </IonContent>
      </IonPage>
    </>
  );
};

export default ParticipantEventPage;

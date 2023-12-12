import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonModal,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useState } from "react";
import HostImg from "../../assets/host.jpg";
import HostImg2 from "../../assets/host2.jpg";
import MetaSafety from "../../assets/metasafety.jpg";
import ParticipantNavMenu from "../../components/menus/ParticipantNavMenu";
import "./ParticipantEventPage.css";

const ParticipantEventPage: React.FC = () => {
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

  const events = [
    {
      date: "Wednesday, November 29, 2023",
      title:
        "Meta Safety in the Modern Age - Strategies for a Secure Digital Journey",
      hostname: "Abdul Rauf M. Sultan",
      hostImg: HostImg,
      venue: "Zoom",
      time: "1:00PM - 3:00PM",
    },
    {
      date: "Friday, December 1, 2023",
      title: "#TechyThursdays - Introduction to Web 3.0",
      hostname: "Jean Irish Mer",
      hostImg: HostImg2,
      venue: "Zoom",
      time: "3:00PM - 5:00PM",
    },
  ];

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
          {filteredEvents.map((event, index) => (
            <React.Fragment key={index}>
              <h1 className="pevent-date">{event.date}</h1>
              <IonCard className="pevent-card">
                <IonCardHeader>
                  <IonCardTitle>{event.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="pevent-host-info">
                    <img
                      src={event.hostImg}
                      alt={`Host: ${event.hostname}`}
                      className="pevent-host-img"
                    />
                    <div className="pevent-host-name">{event.hostname}</div>
                  </div>
                  <div className="pevent-venue">
                    <span>Venue: </span>
                    {event.venue}
                  </div>
                  <div className="pevent-time">
                    <span>Time: </span>
                    {event.time}
                  </div>
                  <div className="peventcard-btn">
                    <IonButton
                      className="pview-btn"
                      onClick={() => openModal(event)}
                    >
                      View
                    </IonButton>
                    <IonButton
                      className="pcancel-btn"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </React.Fragment>
          ))}

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
                      src={MetaSafety}
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
                    <p className="pevent-modal-host">Abdul Rauf M. Sultan</p>
                  </div>
                  <div className="pevent-modal-details">
                    <p>
                      <span>Description:</span> This course is designed to help
                      you master the fundamentals of Visual C# programming. It
                      is intended for absolute beginners with no prior
                      programming experience. The course focuses on the
                      fundamentals of Visual C# programming and covers the
                      following topics: Visual C# language syntax, program
                      structure, and implementation details.
                    </p>
                    <p className="pevent-modal-date">
                      <span>Date:</span> {selectedEvent.date}
                    </p>
                    <p>
                      <span>Host:</span> {selectedEvent.hostname}
                    </p>
                    <p>
                      <span>Venue:</span> {selectedEvent.venue}
                    </p>
                    <p>
                      <span>Time:</span> {selectedEvent.time}
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

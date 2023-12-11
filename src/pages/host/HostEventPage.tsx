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
import HostNavMenu from "../../components/menus/HostNavMenu";
import "./HostEventPage.css";

const HostEventPage: React.FC = () => {
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
      hostname: "Abdul Rauf M. Sultan",
      hostImg: HostImg,
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
      <HostNavMenu />
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

        <IonContent id="hhome-main">
          <IonSearchbar
            className="hsearch-bar"
            placeholder="Search events"
            onIonChange={handleSearchChange}
          ></IonSearchbar>
          {filteredEvents.map((event, index) => (
            <React.Fragment key={index}>
              <h1 className="hevent-date">{event.date}</h1>
              <IonCard className="hevent-card">
                <IonCardHeader>
                  <IonCardTitle>{event.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="hevent-host-info">
                    <img
                      src={event.hostImg}
                      alt={`Host: ${event.hostname}`}
                      className="hevent-host-img"
                    />
                    <div className="hevent-host-name">{event.hostname}</div>
                  </div>
                  <div className="hevent-venue">
                    <span>Venue: </span>
                    {event.venue}
                  </div>
                  <div className="hevent-time">
                    <span>Time: </span>
                    {event.time}
                  </div>
                  <div className="heventcard-btn">
                    <IonButton
                      className="hview-btn"
                      onClick={() => openModal(event)}
                    >
                      View
                    </IonButton>
                    <IonButton
                      className="hcancel-btn"
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
            className="hevent-modal-container"
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

            <IonContent className="hevent-modal-content">
              {selectedEvent && (
                <div>
                  <div className="hevent-modal-header">
                    <p className="hevent-modal-free">Free</p>
                    <IonButton
                      className="hevent-view-poster-btn"
                      onClick={() => setShowPoster(!showPoster)}
                    >
                      {showPoster ? "Hide Poster" : "View Poster"}
                    </IonButton>
                  </div>
                  {showPoster && (
                    <IonImg
                      src={MetaSafety}
                      alt="Poster"
                      className="hevent-poster-img"
                    />
                  )}
                  <h2 className="hevent-modal-title">{selectedEvent.title}</h2>

                  <div className="hevent-modal-host-container">
                    <IonImg
                      src={HostImg}
                      alt="Abdul Rauf M. Sultan"
                      className="hevent-modal-host-img"
                    />
                    <p className="hevent-modal-host">Abdul Rauf M. Sultan</p>
                  </div>
                  <div className="hevent-modal-details">
                    <p>
                      <span>Description:</span> This course is designed to help
                      you master the fundamentals of Visual C# programming. It
                      is intended for absolute beginners with no prior
                      programming experience. The course focuses on the
                      fundamentals of Visual C# programming and covers the
                      following topics: Visual C# language syntax, program
                      structure, and implementation details.
                    </p>
                    <p className="hevent-modal-date">
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

              <div className="hevent-modal-btn-container">
                <IonButton expand="block" className="hevent-edit-btn">
                  Edit Event
                </IonButton>
              </div>
            </IonContent>
          </IonModal>

          {/* Confirmation Modal */}
          <IonModal
            isOpen={showConfirmationModal}
            onDidDismiss={() => setShowConfirmationModal(false)}
            className="hevent-confirmation-modal-container"
          >
            <IonContent className="hevent-confirmation-modal-content">
              <h2 className="hevent-confirmation-modal-txt">Are you sure?</h2>
              <div className="hevent-modal-btn-container">
                <IonButton
                  expand="block"
                  className="hyes-btn"
                  onClick={() => handleConfirmation(true)}
                >
                  Yes
                </IonButton>
                <IonButton
                  expand="block"
                  className="hno-btn"
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

export default HostEventPage;

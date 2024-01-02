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
import VenueNavMenu from "../../components/menus/VenueNavMenu";
import "./VenueBookedEventsPage.css";

const VenueBookedEventsPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showPoster, setShowPoster] = useState(false);
  const [showcancelModal, setShowcancelModal] = useState(false);

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
    setShowcancelModal(true);
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

  const handlecancel = (confirmed: boolean) => {
    if (confirmed) {
      console.log("Event canceled!");
    }

    setShowcancelModal(false);
  };
  return (
    <>
      <VenueNavMenu />
      <IonPage id="main">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>
            {/* <IonMenuButton slot="start" /> */}
            <IonTitle>My Events</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="vhome-main">
          <IonSearchbar
            className="vsearch-bar"
            placeholder="Search events"
            onIonChange={handleSearchChange}
          ></IonSearchbar>
          {filteredEvents.map((event, index) => (
            <React.Fragment key={index}>
              <h1 className="vevent-date">{event.date}</h1>
              <IonCard className="vevent-card">
                <IonCardHeader>
                  <IonCardTitle>{event.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="vevent-host-info">
                    <img
                      src={event.hostImg}
                      alt={`Host: ${event.hostname}`}
                      className="vevent-host-img"
                    />
                    <div className="vevent-host-name">{event.hostname}</div>
                  </div>
                  <div className="vevent-venue">
                    <span>Venue: </span>
                    {event.venue}
                  </div>
                  <div className="vevent-time">
                    <span>Time: </span>
                    {event.time}
                  </div>
                  <div className="veventcard-btn">
                    <IonButton
                      className="vview-btn"
                      onClick={() => openModal(event)}
                    >
                      View
                    </IonButton>
                    <IonButton
                      className="vcancel-btn"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </IonButton>
                    <IonButton className="vchat-btn">Chat</IonButton>
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
            // className="vevent-modal-container"
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

            <IonContent className="vevent-modal-content">
              {selectedEvent && (
                <div>
                  <div className="vevent-modal-header">
                    <p className="vevent-modal-free">Free</p>
                    <IonButton
                      className="vevent-view-poster-btn"
                      onClick={() => setShowPoster(!showPoster)}
                    >
                      {showPoster ? "Hide Poster" : "View Poster"}
                    </IonButton>
                  </div>
                  {showPoster && (
                    <IonImg
                      src={MetaSafety}
                      alt="Poster"
                      className="vevent-poster-img"
                    />
                  )}
                  <h2 className="vevent-modal-title">{selectedEvent.title}</h2>

                  <div className="vevent-modal-host-container">
                    <IonImg
                      src={HostImg}
                      alt="Abdul Rauf M. Sultan"
                      className="vevent-modal-host-img"
                    />
                    <p className="vevent-modal-host">Abdul Rauf M. Sultan</p>
                  </div>
                  <div className="vevent-modal-details">
                    <p>
                      <span>Description:</span> This course is designed to help
                      you master the fundamentals of Visual C# programming. It
                      is intended for absolute beginners with no prior
                      programming experience. The course focuses on the
                      fundamentals of Visual C# programming and covers the
                      following topics: Visual C# language syntax, program
                      structure, and implementation details.
                    </p>
                    <p className="vevent-modal-date">
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

              <div className="vevent-modal-btn-container">
                <IonButton expand="block" className="vevent-booked-btn">
                  Booked
                </IonButton>
              </div>
            </IonContent>
          </IonModal>

          {/* cancel Modal */}
          <IonModal
            isOpen={showcancelModal}
            onDidDismiss={() => setShowcancelModal(false)}
            className="vevent-cancel-modal-container"
          >
            <IonContent className="vevent-cancel-modal-content">
              <h2 className="vevent-cancel-modal-txt">Are you sure?</h2>
              <div className="vevent-modal-btn-container">
                <IonButton
                  expand="block"
                  className="vyes-btn"
                  onClick={() => handlecancel(true)}
                >
                  Yes
                </IonButton>
                <IonButton
                  expand="block"
                  className="vno-btn"
                  onClick={() => handlecancel(false)}
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

export default VenueBookedEventsPage;

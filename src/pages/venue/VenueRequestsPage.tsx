import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useState } from "react";
import HostImg from "../../assets/host.jpg";
import IntrotoCSharp from "../../assets/introtocsharp.jpg";
import MetaSafety from "../../assets/metasafety.jpg";
import techythursdays from "../../assets/techythursdays.jpg";
import VenueNavMenu from "../../components/menus/VenueNavMenu";
import "./VenueRequestsPage.css";

const VenueRequestsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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
            <IonTitle>Requests</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent id="vhome-main">
          <div className="vrequest-cards-container">
            <IonCard className="vrequest-event-card">
              <IonImg
                src={IntrotoCSharp}
                alt="Mastering the Fundamentals: An Introduction to Visual C# Programming."
                className="vrequest-event-image"
              />
              <IonLabel>
                <h2
                  className="vrequest-event-title"
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
                  Mastering the Fundamentals: An Introduction to Visual C#
                  Programming
                </h2>
                <div className="vrequest-event-host-container">
                  <IonImg
                    src={HostImg}
                    alt="Abdul Rauf M. Sultan"
                    className="vrequest-event-host-img"
                  />
                  <p className="vrequest-event-host">Abdul Rauf M. Sultan</p>
                </div>
                <IonLabel className="vrequest-event-details">
                  <p>
                    <span>Date:</span> October 15, 2023
                  </p>
                  <p>
                    <span>Time:</span> 3:00 PM - 5:00 PM
                  </p>
                  <p className="vrequest-event-free">Free</p>
                </IonLabel>
                <div className="vrequest-event-buttons">
                  <IonButton
                    expand="block"
                    className="vrequest-view-details-btn"
                    onClick={openModal}
                  >
                    View Details
                  </IonButton>
                  <IonButton
                    expand="block"
                    className="vrequest-chat-btn"
                    onClick={() => {}}
                  >
                    Chat
                  </IonButton>
                </div>
              </IonLabel>
            </IonCard>

            <IonCard className="vrequest-event-card">
              <IonImg
                src={MetaSafety}
                alt="Meta Safety in the Modern Age - Strategies for a Secure Digital Journey"
                className="vrequest-event-image"
              />
              <IonLabel>
                <h2
                  className="vrequest-event-title"
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
                  Meta Safety in the Modern Age - Strategies for a Secure
                  Digital Journey
                </h2>
                <div className="vrequest-event-host-container">
                  <IonImg
                    src={HostImg}
                    alt="Abdul Rauf M. Sultan"
                    className="vrequest-event-host-img"
                  />
                  <p className="vrequest-event-host">Abdul Rauf M. Sultan</p>
                </div>
                <IonLabel className="vrequest-event-details">
                  <p>
                    <span>Date:</span> October 15, 2023
                  </p>
                  <p>
                    <span>Time:</span> 3:00 PM - 5:00 PM
                  </p>
                  <p className="vrequest-event-paid">₱200.00</p>
                </IonLabel>
                <div className="vrequest-event-buttons">
                  <IonButton
                    expand="block"
                    className="vrequest-view-details-btn"
                    onClick={openModal}
                  >
                    View Details
                  </IonButton>
                  <IonButton
                    expand="block"
                    className="vrequest-chat-btn"
                    onClick={() => {}}
                  >
                    Chat
                  </IonButton>
                </div>
              </IonLabel>
            </IonCard>

            <IonCard className="vrequest-event-card">
              <IonImg
                src={techythursdays}
                alt="#TechyThursdays - Introduction to Web 3.0"
                className="vrequest-event-image"
              />
              <IonLabel>
                <h2
                  className="vrequest-event-title"
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
                  #TechyThursdays - Introduction to Web 3.0
                </h2>
                <div className="vrequest-event-host-container">
                  <IonImg
                    src={HostImg}
                    alt="Abdul Rauf M. Sultan"
                    className="vrequest-event-host-img"
                  />
                  <p className="vrequest-event-host">Abdul Rauf M. Sultan</p>
                </div>
                <IonLabel className="vrequest-event-details">
                  <p>
                    <span>Date:</span> October 15, 2023
                  </p>
                  <p>
                    <span>Time:</span> 3:00 PM - 5:00 PM
                  </p>
                  <p className="vrequest-event-free">Free</p>
                </IonLabel>
                <div className="vrequest-event-buttons">
                  <IonButton
                    expand="block"
                    className="vrequest-view-details-btn"
                    onClick={openModal}
                  >
                    View Details
                  </IonButton>
                  <IonButton
                    expand="block"
                    className="vrequest-chat-btn"
                    onClick={() => {}}
                  >
                    Chat
                  </IonButton>
                </div>
              </IonLabel>
            </IonCard>

            {/* Modal */}
            <IonModal
              isOpen={showModal}
              onDidDismiss={closeModal}
              // className="vrequest-modal-container"
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

              <IonContent className="vrequest-modal-content">
                <div className="vrequest-modal-event-info">
                  <p className="vrequest-event-free">Free</p>
                  <h2 className="vrequest-modal-title">
                    Mastering the Fundamentals: An Introduction to Visual C#
                    Programming
                  </h2>
                </div>
                <div className="vrequest-modal-host-container">
                  <IonImg
                    src={HostImg}
                    alt="Abdul Rauf M. Sultan"
                    className="vrequest-modal-host-img"
                  />
                  <p className="vrequest-modal-host">Abdul Rauf M. Sultan</p>
                </div>
                <div className="vrequest-modal-details">
                  <p>
                    <span>Description:</span> This course is designed to help
                    you master the fundamentals of Visual C# programming. It is
                    intended for absolute beginners with no prior programming
                    experience. The course focuses on the fundamentals of Visual
                    C# programming and covers the following topics: Visual C#
                    language syntax, program structure, and implementation
                    details.
                  </p>
                  <p>
                    <span>Venue:</span> SMX Olongapo
                  </p>
                  <p>
                    <span>Date:</span> October 15, 2023
                  </p>
                  <p>
                    <span>Time:</span> 3:00 PM - 5:00 PM
                  </p>
                </div>
                <div className="vrequest-btn-container">
                  <IonButton
                    expand="block"
                    className="vrequest-accept-btn"
                    onClick={() => {}}
                  >
                    Accept
                  </IonButton>
                  <IonButton
                    expand="block"
                    className="vrequest-decline-btn"
                    onClick={() => {}}
                  >
                    Decline
                  </IonButton>
                </div>
              </IonContent>
            </IonModal>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueRequestsPage;

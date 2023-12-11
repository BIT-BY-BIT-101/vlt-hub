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
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import "./VenueHomePage.css";

const VenueHomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <IonPage>
      <VenueNavMenu />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton autoHide={false}></IonMenuButton>
          </IonButtons>
          {/* <IonMenuButton slot="start" /> */}
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="vhome-main">
        <div className="vhome-cards-container">
          <IonCard className="vhome-event-card" onClick={openModal}>
            <IonImg
              src={IntrotoCSharp}
              alt="Mastering the Fundamentals: An Introduction to Visual C# Programming."
              className="vhome-event-image"
            />
            <IonLabel>
              <h2
                className="vhome-event-title"
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
              <div className="vhome-event-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="vhome-event-host-img"
                />
                <p className="vhome-event-host">Abdul Rauf M. Sultan</p>
              </div>
              <IonLabel className="vhome-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
                <p className="vhome-event-free">Free</p>
              </IonLabel>
            </IonLabel>
          </IonCard>

          <IonCard className="vhome-event-card" onClick={openModal}>
            <IonImg
              src={MetaSafety}
              alt="Meta Safety in the Modern Age - Strategies for a Secure Digital Journey"
              className="vhome-event-image"
            />
            <IonLabel>
              <h2
                className="vhome-event-title"
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
                Meta Safety in the Modern Age - Strategies for a Secure Digital
                Journey
              </h2>
              <div className="vhome-event-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="vhome-event-host-img"
                />
                <p className="vhome-event-host">Abdul Rauf M. Sultan</p>
              </div>
              <IonLabel className="vhome-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
                <p className="vhome-event-paid">₱200.00</p>
              </IonLabel>
            </IonLabel>
          </IonCard>

          <IonCard className="vhome-event-card" onClick={openModal}>
            <IonImg
              src={techythursdays}
              alt="#TechyThursdays - Introduction to Web 3.0"
              className="vhome-event-image"
            />
            <IonLabel>
              <h2
                className="vhome-event-title"
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
              <div className="vhome-event-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="vhome-event-host-img"
                />
                <p className="vhome-event-host">Abdul Rauf M. Sultan</p>
              </div>
              <IonLabel className="vhome-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
                <p className="vhome-event-free">Free</p>
              </IonLabel>
            </IonLabel>
          </IonCard>

          {/* Modal */}
          <IonModal
            isOpen={showModal}
            onDidDismiss={closeModal}
            className="vhome-modal-container"
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

            <IonContent className="vhome-modal-content">
              <div className="vhome-modal-event-info">
                <p className="vhome-event-free">Free</p>
                <h2 className="vhome-modal-title">
                  Mastering the Fundamentals: An Introduction to Visual C#
                  Programming
                </h2>
              </div>
              <div className="vhome-modal-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="vhome-modal-host-img"
                />
                <p className="vhome-modal-host">Abdul Rauf M. Sultan</p>
              </div>
              <div className="vhome-modal-details">
                <p>
                  <span>Description:</span> This course is designed to help you
                  master the fundamentals of Visual C# programming. It is
                  intended for absolute beginners with no prior programming
                  experience. The course focuses on the fundamentals of Visual
                  C# programming and covers the following topics: Visual C#
                  language syntax, program structure, and implementation
                  details.
                </p>
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
              </div>
            </IonContent>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VenueHomePage;

import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
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
  IonRow,
  IonSearchbar,
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
import "./VenueHistoryPage.css";

const VenueHistoryPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSearchInputChange = (e: CustomEvent) => {
    setSearchText(e.detail.value);
  };

  return (
    <IonPage>
      <VenueNavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="vhome-main">
        <IonSearchbar
          className="vhistory-searchbar"
          value={searchText}
          onIonChange={handleSearchInputChange}
          placeholder="Search events..."
        />
        <div className="vhistory-cards-container">
          <IonCard className="vhistory-event-card" onClick={openModal}>
            <IonImg
              src={IntrotoCSharp}
              alt="Mastering the Fundamentals: An Introduction to Visual C# Programming."
              className="vhistory-event-image"
            />
            <IonLabel>
              <h2
                className="vhistory-event-title"
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
              <div className="vhistory-event-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="vhistory-event-host-img"
                />
                <p className="vhistory-event-host">Abdul Rauf M. Sultan</p>
              </div>
              <IonLabel className="vhistory-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
                <p className="vhistory-event-free">Free</p>
              </IonLabel>
            </IonLabel>
          </IonCard>

          <IonCard className="vhistory-event-card" onClick={openModal}>
            <IonImg
              src={MetaSafety}
              alt="Meta Safety in the Modern Age - Strategies for a Secure Digital Journey"
              className="vhistory-event-image"
            />
            <IonLabel>
              <h2
                className="vhistory-event-title"
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
              <div className="vhistory-event-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="vhistory-event-host-img"
                />
                <p className="vhistory-event-host">Abdul Rauf M. Sultan</p>
              </div>
              <IonLabel className="vhistory-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
                <p className="vhistory-event-paid">₱200.00</p>
              </IonLabel>
            </IonLabel>
          </IonCard>

          <IonCard className="vhistory-event-card" onClick={openModal}>
            <IonImg
              src={techythursdays}
              alt="#TechyThursdays - Introduction to Web 3.0"
              className="vhistory-event-image"
            />
            <IonLabel>
              <h2
                className="vhistory-event-title"
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
              <div className="vhistory-event-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="vhistory-event-host-img"
                />
                <p className="vhistory-event-host">Abdul Rauf M. Sultan</p>
              </div>
              <IonLabel className="vhistory-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
                <p className="vhistory-event-free">Free</p>
              </IonLabel>
            </IonLabel>
          </IonCard>

          {/* Modal */}
          <IonModal
            isOpen={showModal}
            onDidDismiss={closeModal}
            // className="vhistory-modal-container"
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

            <IonContent className="vhistory-modal-content">
              <div className="vhistory-modal-event-info">
                <p className="vhistory-event-free">Free</p>
                <h2 className="vhistory-modal-title">
                  Mastering the Fundamentals: An Introduction to Visual C#
                  Programming
                </h2>
              </div>
              <div className="vhistory-modal-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="vhistory-modal-host-img"
                />
                <p className="vhistory-modal-host">Abdul Rauf M. Sultan</p>
              </div>
              <div className="vhistory-modal-details">
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
              <div className="vhistory-btn-container">
                <IonButton
                  expand="block"
                  className="vhistory-register-btn"
                  onClick={() => {}}
                >
                  Rate this event
                </IonButton>
              </div>
            </IonContent>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VenueHistoryPage;

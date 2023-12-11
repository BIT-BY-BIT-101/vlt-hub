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
import HostNavMenu from "../../components/menus/HostNavMenu";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import "./HostHistoryPage.css";

const HostHistoryPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSearchInputChange = (e: CustomEvent) => {
    setSearchText(e.detail.value);
  };

  return (
    <IonPage>
      <HostNavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="hhome-main">
        <IonSearchbar
          className="hhistory-searchbar"
          value={searchText}
          onIonChange={handleSearchInputChange}
          placeholder="Search events..."
        />
        <div className="hhistory-cards-container">
          <IonCard className="hhistory-event-card" onClick={openModal}>
            <IonImg
              src={IntrotoCSharp}
              alt="Mastering the Fundamentals: An Introduction to Visual C# Programming."
              className="hhistory-event-image"
            />
            <IonLabel>
              <h2
                className="hhistory-event-title"
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
              <div className="hhistory-event-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="hhistory-event-host-img"
                />
                <p className="hhistory-event-host">Abdul Rauf M. Sultan</p>
              </div>
              <IonLabel className="hhistory-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
                <p className="hhistory-event-free">Free</p>
              </IonLabel>
            </IonLabel>
          </IonCard>

          <IonCard className="hhistory-event-card" onClick={openModal}>
            <IonImg
              src={MetaSafety}
              alt="Meta Safety in the Modern Age - Strategies for a Secure Digital Journey"
              className="hhistory-event-image"
            />
            <IonLabel>
              <h2
                className="hhistory-event-title"
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
              <div className="hhistory-event-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="hhistory-event-host-img"
                />
                <p className="hhistory-event-host">Abdul Rauf M. Sultan</p>
              </div>
              <IonLabel className="hhistory-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
                <p className="hhistory-event-paid">₱200.00</p>
              </IonLabel>
            </IonLabel>
          </IonCard>

          <IonCard className="hhistory-event-card" onClick={openModal}>
            <IonImg
              src={techythursdays}
              alt="#TechyThursdays - Introduction to Web 3.0"
              className="hhistory-event-image"
            />
            <IonLabel>
              <h2
                className="hhistory-event-title"
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
              <div className="hhistory-event-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="hhistory-event-host-img"
                />
                <p className="hhistory-event-host">Abdul Rauf M. Sultan</p>
              </div>
              <IonLabel className="hhistory-event-details">
                <p>
                  <span>Venue:</span> Zoom
                </p>
                <p>
                  <span>Date:</span> October 15, 2023
                </p>
                <p>
                  <span>Time:</span> 3:00 PM - 5:00 PM
                </p>
                <p className="hhistory-event-free">Free</p>
              </IonLabel>
            </IonLabel>
          </IonCard>

          {/* Modal */}
          <IonModal
            isOpen={showModal}
            onDidDismiss={closeModal}
            className="hhistory-modal-container"
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

            <IonContent className="hhistory-modal-content">
              <div className="hhistory-modal-event-info">
                <p className="hhistory-event-free">Free</p>
                <h2 className="hhistory-modal-title">
                  Mastering the Fundamentals: An Introduction to Visual C#
                  Programming
                </h2>
              </div>
              <div className="hhistory-modal-host-container">
                <IonImg
                  src={HostImg}
                  alt="Abdul Rauf M. Sultan"
                  className="hhistory-modal-host-img"
                />
                <p className="hhistory-modal-host">Abdul Rauf M. Sultan</p>
              </div>
              <div className="hhistory-modal-details">
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
              <div className="hhistory-btn-container">
                <IonButton
                  expand="block"
                  className="hhistory-register-btn"
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

export default HostHistoryPage;

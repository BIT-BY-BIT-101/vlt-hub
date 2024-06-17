import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonModal,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import HostImg from "../../assets/host.jpg";
import IntrotoCSharp from "../../assets/introtocsharp.jpg";
import { closeCircle } from "ionicons/icons";

const HistoryCard = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSearchInputChange = (e: CustomEvent) => {
    setSearchText(e.detail.value);
  };
  return (
    <IonCard className="phistory-event-card" onClick={openModal}>
      <IonImg
        src={IntrotoCSharp}
        alt="Mastering the Fundamentals: An Introduction to Visual C# Programming."
        className="phistory-event-image"
      />
      <IonLabel>
        <h2
          className="phistory-event-title"
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
          Mastering the Fundamentals: An Introduction to Visual C# Programming
        </h2>
        <div className="phistory-event-host-container">
          <IonImg
            src={HostImg}
            alt="Abdul Rauf M. Sultan"
            className="phistory-event-host-img"
          />
          <p className="phistory-event-host">Abdul Rauf M. Sultan</p>
        </div>
        <IonLabel className="phistory-event-details">
          <p>
            <span>Venue:</span> Zoom
          </p>
          <p>
            <span>Date:</span> October 15, 2023
          </p>
          <p>
            <span>Time:</span> 3:00 PM - 5:00 PM
          </p>
          <p className="phistory-event-free">Free</p>
        </IonLabel>
      </IonLabel>

      {/* Modal */}
      <IonModal
        isOpen={showModal}
        onDidDismiss={closeModal}
        // className="phistory-modal-container"
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

        <IonContent className="phistory-modal-content">
          <div className="phistory-modal-event-info">
            <p className="phistory-event-free">Free</p>
            <h2 className="phistory-modal-title">
              Mastering the Fundamentals: An Introduction to Visual C#
              Programming
            </h2>
          </div>
          <div className="phistory-modal-host-container">
            <IonImg
              src={HostImg}
              alt="Abdul Rauf M. Sultan"
              className="phistory-modal-host-img"
            />
            <p className="phistory-modal-host">Abdul Rauf M. Sultan</p>
          </div>
          <div className="phistory-modal-details">
            <p>
              <span>Description:</span> This course is designed to help you
              master the fundamentals of Visual C# programming. It is intended
              for absolute beginners with no prior programming experience. The
              course focuses on the fundamentals of Visual C# programming and
              covers the following topics: Visual C# language syntax, program
              structure, and implementation details.
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
          <div className="phistory-btn-container">
            <IonButton
              expand="block"
              className="phistory-register-btn"
              onClick={() => {}}
            >
              Rate this event
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
    </IonCard>
  );
};

export default HistoryCard;

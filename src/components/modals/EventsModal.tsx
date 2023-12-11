import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonImg,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React from "react";
import HostImg from "../../assets/defaultCover.jpg";

type EventModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
};

const EventsModal = ({ isOpen, onDidDismiss }: EventModalProps) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      className="phome-modal-container"
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>
              <IonIcon icon={closeCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="phome-modal-content">
        <div className="phome-modal-event-info">
          <p className="phome-event-free">Free</p>
          <h2 className="phome-modal-title">
            Mastering the Fundamentals: An Introduction to Visual C# Programming
          </h2>
        </div>
        <div className="phome-modal-host-container">
          <IonImg
            src={HostImg}
            alt="Abdul Rauf M. Sultan"
            className="phome-modal-host-img"
          />
          <p className="phome-modal-host">Abdul Rauf M. Sultan</p>
        </div>
        <div className="phome-modal-details">
          <p>
            <span>Description:</span> This course is designed to help you master
            the fundamentals of Visual C# programming. It is intended for
            absolute beginners with no prior programming experience. The course
            focuses on the fundamentals of Visual C# programming and covers the
            following topics: Visual C# language syntax, program structure, and
            implementation details.
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
        <div className="phome-btn-container">
          <IonButton
            expand="block"
            className="phome-register-btn"
            onClick={() => {}}
          >
            Register
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default EventsModal;

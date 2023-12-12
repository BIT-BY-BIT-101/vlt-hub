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
import { EventDataModel } from "../../models/Model";
import { formatTimeString } from "../../functions/functions";

type EventModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  selected?: EventDataModel;
};

const EventsModal = ({ isOpen, onDidDismiss, selected }: EventModalProps) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      // className="phome-modal-container"
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
            {/* Mastering the Fundamentals: An Introduction to Visual C# Programming */}
            {selected?.title || ""}
          </h2>
        </div>
        <div className="phome-modal-host-container">
          <IonImg
            src={HostImg}
            alt="Abdul Rauf M. Sultan"
            className="phome-modal-host-img"
          />
          <p className="phome-modal-host">{selected?.host_name}</p>
        </div>
        <div className="phome-modal-details">
          <p>
            <span>Description:</span> {selected?.description || "NONE"}
          </p>
          <p>
            <span>Venue:</span>
            {selected?.venue}
          </p>
          <p>
            <span>Date:</span> October 15, 2023
          </p>
          <p>
            <span>Time:</span> {formatTimeString(selected?.startTime!)} -
            {formatTimeString(selected?.endTime!)}
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

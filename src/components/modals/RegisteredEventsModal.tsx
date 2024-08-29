import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonImg,
  IonItem,
  IonThumbnail,
  IonLabel,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useContext, useState } from "react";
import {
  formatDateString,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
import { EventDataModel } from "../../models/Model";
import HostImg from "../../assets/host.jpg";
import useGetDoc from "../../hooks/useGetDoc";
import { AuthContext } from "../../context/AuthContext";

type Props = {
  isOpen: boolean;
  onDidDismiss: () => void;
  selected?: EventDataModel;
};

const RegisteredEventsModal = ({ isOpen, onDidDismiss, selected }: Props) => {
  const {
    data: host,
    loading,
    error,
  } = useGetDoc("profiles", selected?.host_id);
  const [showPoster, setShowPoster] = useState(false);
  const { currentUser } = useContext(AuthContext);

  if (loading) {
    return <p>loading.....</p>;
  }

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      className="pevent-modal-container"
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

      <IonContent>
        {selected && (
          <div>
            <div className="pevent-modal-header">
              <p className="pevent-modal-free">Free</p>
              <IonButton
                shape="round"
                fill="outline"
                slot="end"
                color="tertiary"
                className="pevent-view-poster-btn"
                onClick={() => setShowPoster(!showPoster)}
              >
                {showPoster ? "Hide Poster" : "View Poster"}
              </IonButton>
            </div>
            {showPoster && (
              <IonImg
                src={selected.imageUrl}
                alt="Poster"
                className="pevent-poster-img"
              />
            )}
            <h2 className="pevent-modal-title">{selected.title}</h2>

            <IonItem className="item-color">
              <IonThumbnail slot="start">
                <img src={HostImg} />
              </IonThumbnail>
              <p className="pevent-modal-host">
                {host.fname} {host.lname}
              </p>
            </IonItem>
            <IonItem className="item-color">
              <p>
                <span className="text-color-rgb">Date: </span>
                {formatDateString(selected.event_date)}
              </p>
            </IonItem>
            <IonItem className="item-color">
              <IonLabel className="ion-text-wrap">
                <span>Description:</span>
                <br />
                <p>{selected.description}</p>
              </IonLabel>
            </IonItem>
            <div className="pevent-modal-details">
              <p>
                <span>Venue:</span> {selected.venue}
              </p>
              <p>
                <span>Time:</span> {formatTimeString(selected.start_time)}{" "}
                {formatTimeString(selected.end_time)}
              </p>
            </div>
          </div>
        )}
      </IonContent>
      <div className="pevent-modal-btn-container">
        <IonButton
          color={"tertiary"}
          shape="round"
          expand="block"
          className="pevent-registered-btn"
        >
          Registered
        </IonButton>
      </div>
    </IonModal>
  );
};

export default RegisteredEventsModal;

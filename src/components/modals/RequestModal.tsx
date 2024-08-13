import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React from "react";
import {
  formatDateString,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
import useFirestore from "../../hooks/useFirestore";
import { serverTimestamp } from "firebase/firestore";

type Props = {
  isOpen: boolean;
  onDidDismissal: () => void;
  onClose: () => void;
  selected: any;
};

const RequestModal: React.FC<Props> = ({
  isOpen,
  onDidDismissal,
  onClose,
  selected,
}) => {
  const { updateData } = useFirestore("events");
  console.log(selected);

  async function handleUpdate() {
    console.log(selected.id);

    await updateData(selected.event_id, {
      updatedAt: serverTimestamp(),
      status: "confirming",
    });
  }

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDidDismissal}
      className="modal-container"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{selected.event_title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismissal}>
              <IonIcon icon={closeCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList className="item-color-dark">
          <IonItem className="item-color-dark">
            <IonLabel slot="start">
              <h3>Host:</h3>
              <p slot="start">{selected.host_name}</p>
            </IonLabel>
          </IonItem>
          <IonItem className="item-color-dark">
            <IonLabel slot="start">
              <h3>Date:</h3>
              <p slot="start">{formatDateString(selected.event_date)}</p>
            </IonLabel>
          </IonItem>
          <IonItem className="item-color-dark">
            <IonLabel slot="start">
              <h3>Description:</h3>
              <p slot="start">{selected.description}</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonButton color={"tertiary"} onClick={handleUpdate}>
        Accept
      </IonButton>
    </IonModal>
  );
};

export default RequestModal;

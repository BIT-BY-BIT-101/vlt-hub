import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
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
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import useRequestHandles from "../../hooks/useHandleRequests";

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
  const { handleAccept, handleReject } = useRequestHandles(
    selected
    // onDidDismissal
  );

  const history = useHistory();

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDidDismissal}
      // className="modal-container"
    >
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>{selected?.event_title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismissal}>
              <IonIcon icon={closeCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* <IonList className="item-bg-none"> */}
        <IonItem className="item-bg-none">
          <IonLabel slot="start">
            <strong>Host</strong>
            <p slot="start">{selected?.host_name}</p>
          </IonLabel>
        </IonItem>
        <IonItem className="item-bg-none">
          <IonLabel slot="start">
            <strong>Date</strong>
            <p slot="start">{formatDateString(selected?.event_date)}</p>
          </IonLabel>
        </IonItem>
        <IonItem className="item-bg-none">
          <IonLabel>
            <strong>Description</strong>
            <br />
            {/* <p>{selected?.event_description}</p> */}
            <p
              dangerouslySetInnerHTML={{
                __html: selected?.event_description.replace(/\n/g, "<br />"),
              }}
            />
          </IonLabel>
        </IonItem>
        {/* </IonList> */}
      </IonContent>

      <IonFooter>
        <IonItem className="item-bg-none">
          <IonButtons slot="end">
            <IonButton
              fill="solid"
              slot="end"
              // strong
              // shape="round"
              color={"primary"}
              onClick={() => handleAccept(onDidDismissal)}
            >
              Accept
            </IonButton>
            <IonButton
              // fill="outline"
              // shape="round"
              strong
              color={"danger"}
              onClick={() => handleReject(onDidDismissal)}
            >
              Reject
            </IonButton>
          </IonButtons>
        </IonItem>
      </IonFooter>
    </IonModal>
  );
};

export default RequestModal;

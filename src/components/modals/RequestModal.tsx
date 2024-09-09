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
  const { updateData, error, loading } = useFirestore("events");
  const {
    updateData: updateRequest,
    error: requestError,
    loading: requestLoading,
  } = useFirestore("request");
  const history = useHistory();
  console.log(selected);

  async function handleUpdate() {
    console.log(selected.id);

    Swal.fire({
      icon: "question",
      heightAuto: false,
      title: "Are you sure?",
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          heightAuto: false,
          position: "top-right",
          title: "Accepting..",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(async (result) => {
          await updateData(selected.event_id, {
            updatedAt: serverTimestamp(),
            status: "confirming",
          }).then(() => {
            if (error === null) {
              Swal.fire({
                title: "Success!",
                text: "Event accepted successfully",
                icon: "success",
                confirmButtonText: "ok",
                heightAuto: false,
              }).then(() => {
                // history.push("/venue/requests");
                onDidDismissal();
              });
            } else {
              Swal.fire({
                title: "An Error Occured",
                heightAuto: false,
                icon: "error",
              });
            }
          });
        });
      }
    });
  }

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
            <p>{selected?.event_description}</p>
          </IonLabel>
        </IonItem>
        {/* </IonList> */}
      </IonContent>

      <IonFooter>
        {/* <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                shape="round"
                color={"tertiary"}
                onClick={handleUpdate}
              >
                Accept
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                fill="outline"
                shape="round"
                color={"danger"}
                onClick={handleUpdate}
              >
                Reject
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid> */}

        <IonItem className="item-bg-none">
          <IonButtons slot="end">
            <IonButton
              fill="solid"
              slot="end"
              // strong
              // shape="round"
              color={"primary"}
              onClick={handleUpdate}
            >
              Accept
            </IonButton>
            <IonButton
              // fill="outline"
              // shape="round"
              strong
              color={"danger"}
              onClick={handleUpdate}
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

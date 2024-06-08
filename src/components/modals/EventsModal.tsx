import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonModal,
  IonToolbar,
} from "@ionic/react";
import { arrayUnion } from "firebase/firestore";
import { closeCircle } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import HostImg from "../../assets/defaultCover.jpg";
import { auth } from "../../config/firebase";
import paymongo from "../../config/paymongo";
import { formatTimeString } from "../../functions/functions";
import useFirestore from "../../hooks/useFirestore";
import useQuery from "../../hooks/useQuery";
import { EventDataModel } from "../../models/Model";

type EventModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  selected?: EventDataModel;
};

const EventsModal = ({ isOpen, onDidDismiss, selected }: EventModalProps) => {
  const { updateData: updateEnrolled } = useFirestore("profiles");
  const { updateData: updateParticipants } = useFirestore("events");
  const { addData } = useFirestore("event_enrolled");
  const { addData: addPayment } = useFirestore("payments");
  const { data: participants } = useQuery(
    "events",
    "status",
    "array-contains",
    auth.currentUser?.uid!
  );
  const history = useHistory();

  const userId = auth.currentUser?.uid!;

  const handleRegister = async () => {
    const newData = {
      host_id: selected?.host_id,
      user_id: userId,
      event_id: selected?.id,
    };
    await addData(newData);
    console.log(newData);

    await updateParticipants(selected?.id!, {
      participants: arrayUnion(userId),
    });
    await updateEnrolled(userId, {
      registered_events: arrayUnion(selected?.id),
    });
  };

  const payload = {
    data: {
      attributes: {
        send_email_receipt: true,
        show_description: true,
        show_line_items: true,
        cancel_url: "http://localhost:8080/participant/",
        line_items: [
          {
            currency: "PHP",
            images: [selected?.imgUrl],
            amount: selected?.event_fee! * 100,
            description: selected?.title,
            name: selected?.title,
            quantity: 1,
          },
        ],
        description: selected?.title,
        payment_method_types: ["gcash", "card", "paymaya"],
        reference_number: "n45a4s",
        success_url: `http://localhost:8080/payments/${selected?.id}/success`,
      },
    },
  };

  const handleCheckout = async () => {
    await paymongo
      .post(`/checkout_sessions`, payload)
      .then((res) => {
        // const checkoutId = res;
        // console.log(res.data);
        // console.log(res.data.data.id);

        const paymentDetails = {
          amount: selected?.event_fee!,
          currency: "PHP",
          userId: auth.currentUser?.uid!,
          eventId: selected?.id!,
          checkout_id: res.data.data.id,
        };

        addPayment(paymentDetails);
        window.location.href = res.data.data.attributes.checkout_url;

        // updateEnrolled(userId, {
        //   registered_events: arrayUnion(selected?.id),
        // });
      })
      .catch((err) => {
        console.log("messeges: ", err.response.data.errors);
      });
  };
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
            onClick={selected?.event_fee ? handleCheckout : handleRegister}
          >
            {selected?.event_fee ? "Pay Now" : "Register"}
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default EventsModal;

import {
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonModal,
  IonToolbar,
  IonSearchbar,
  IonThumbnail,
  IonItem,
  IonLabel,
  IonCardSubtitle,
} from "@ionic/react";
import React, { useState } from "react";
import {
  formatDateString,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
import { EventDataModel } from "../../models/Model";
import { closeCircle } from "ionicons/icons";
import { auth } from "../../config/firebase";
import useQuery from "../../hooks/useQuery";
import HostImg from "../../assets/host.jpg";
import EventsModal from "../modals/EventsModal";
import "./RegisteredEventsCard.css";
import useGetDoc from "../../hooks/useGetDoc";
import RegisteredEventsModal from "../modals/RegisteredEventsModal";
import Loader from "../loaders/Loader";
import { DocumentData } from "firebase/firestore";

const RegisteredEventsCard = () => {
  const {
    data: events,
    error,
    loading,
  } = useQuery(
    "events",
    "participants",
    "array-contains",
    auth.currentUser?.uid!
  );
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const openModal = (event: EventDataModel) => {
    setSelected(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelected(null);
    setShowModal(false);
  };

  const filteredEvents = searchText
    ? events.filter((event: EventDataModel) =>
        event.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : events;

  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      console.log("Event canceled!");
    }

    setShowConfirmationModal(false);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {/* <IonSearchbar
        className="psearch-bar"
        placeholder="Search events"
        onIonChange={handleSearchChange}
      ></IonSearchbar> */}
      {filteredEvents.map((event: DocumentData, index: number) => (
        <IonCol size="auto" size-md="6" size-lg="3" sizeXs="10" key={index}>
          <>
            <IonCard
              className="bg-color-main ion-padding cursor-pointer"
              // onClick={() => openModal(event)}
              routerLink={`/participant/event/details/${event.id}`}
            >
              <IonItem className="item-color">
                <IonLabel>
                  <IonCardTitle className="text-color-dark f-size-auto">
                    <IonLabel>{event.title}</IonLabel>
                  </IonCardTitle>

                  <IonCardSubtitle>
                    <IonLabel>
                      <p>
                        by: <strong>{event.host_name}</strong>
                      </p>
                    </IonLabel>
                  </IonCardSubtitle>
                </IonLabel>
              </IonItem>

              <IonItem className="item-color">
                <IonLabel>
                  <p>
                    <span className=" text-color-rgb">Date: </span>
                    {formatDateString(event.date_from)}
                  </p>
                </IonLabel>
              </IonItem>
              <IonItem className="item-color">
                <IonLabel>
                  <p>
                    <span className=" text-color-rgb">Time: </span>
                    {`${formatTimeString(
                      event.start_time
                    )} - ${formatTimeString(event.end_time)}`}
                  </p>
                </IonLabel>
              </IonItem>
            </IonCard>
          </>
        </IonCol>
      ))}
    </>
  );
};

export default RegisteredEventsCard;

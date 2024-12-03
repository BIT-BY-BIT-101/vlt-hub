import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonRow,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import { VenueDataModel } from "../../models/Model";
import "./VenueCard.css";
import useQuery from "../../hooks/useQuery";
import { AuthContext } from "../../context/AuthContext";
import useQueryDoc from "../../hooks/useQueryDoc";
import {
  formatDateString,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
import useFetchpublishEvents from "../../hooks/useFetchpublishEvents";

const VenueCard = () => {
  const { currentUser } = useContext(AuthContext);
  const { data: events, loading, error, hostInfo } = useFetchpublishEvents();
  // const { data: venueData } = useFirestore("venues");
  const { data: venueData } = useQuery(
    "venues",
    "user_id",
    "==",
    currentUser?.uid
  );
  // const { data: venueData } = useQueryDoc("venues", "fuKYymMoAdXNFZRMWbY7");
  const [showcancelModal, setShowcancelModal] = useState(false);

  const handleCancelClick = () => {
    setShowcancelModal(true);
  };

  // console.log(venueData);
  // console.log(currentUser?.uid);

  // const handlecancel = (confirmed: boolean) => {
  //   if (confirmed) {
  //     console.log("Venue removed!");
  //   }
  //   setShowcancelModal(false);
  // };
  return (
    <>
      {venueData &&
        venueData.map((venue: VenueDataModel) => (
          <IonCard key={venue.id} className="card">
            <IonCardHeader>
              <IonCardTitle className="card-title">{venue.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {/* <IonList className="item-color-dark">
                <IonLabel className="card-label">Description</IonLabel>
                <IonItem className="item-color-dark">
                  {venue.description}
                </IonItem>
              </IonList> */}
              <IonList className="item-color-dark">
                <IonLabel className="card-label ion-margin-start">
                  {/* <IonItem className="item-color-dark"> */}
                  {venue.bldg_no} {venue.street} {venue.city}
                  {/* </IonItem> */}
                </IonLabel>
              </IonList>
              <IonList className="item-color-dark">
                <IonItem className="item-color-dark">
                  <IonButton
                    className="ct-btn"
                    shape="round"
                    color={"tertiary"}
                    fill="outline"
                    routerLink="/venue/list-venue"
                    // slot="start"
                  >
                    Facilities
                  </IonButton>
                  <IonButton
                    className="ct-btn"
                    shape="round"
                    color={"tertiary"}
                    fill="outline"
                    routerLink="/venue/verification-requests"
                    // slot="start"
                  >
                    Verification Requests
                  </IonButton>
                  <IonButton
                    className="ct-btn"
                    shape="round"
                    color={"tertiary"}
                    fill="outline"
                    routerLink="/venue/requests"
                    // slot="start"
                  >
                    Rental Request
                  </IonButton>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        ))}

      {events?.map((event) => (
        <IonCard className="card ion-padding" key={event.id}>
          <IonGrid>
            <IonRow>
              <IonCardTitle>
                <IonLabel className="card-label">
                  <span className="form-title">{event.title}</span>
                  <IonNote style={{ color: "var(--ion-color-primary)" }}>
                    by: {event.host_name}
                  </IonNote>
                </IonLabel>
              </IonCardTitle>
            </IonRow>
            <IonRow>
              <IonCardContent>
                <IonRow>
                  <IonLabel>
                    <strong className="form-title">Date: </strong>
                    <span className="form-label">
                      {formatDateString(event.date_from)}
                    </span>
                  </IonLabel>
                </IonRow>
                <IonRow>
                  <IonLabel>
                    <strong className="form-title">Time: </strong>
                    <span className="form-label">
                      {formatTimeString(event.start_time)}-
                      {formatTimeString(event.end_time)}
                    </span>
                  </IonLabel>
                </IonRow>
              </IonCardContent>
            </IonRow>
          </IonGrid>
        </IonCard>
      ))}
    </>
  );
};

export default VenueCard;

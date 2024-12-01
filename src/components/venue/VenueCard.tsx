import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import { VenueDataModel } from "../../models/Model";
import "./VenueCard.css";
import useQuery from "../../hooks/useQuery";
import { AuthContext } from "../../context/AuthContext";
import useQueryDoc from "../../hooks/useQueryDoc";

const VenueCard = () => {
  const { currentUser } = useContext(AuthContext);
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
              {/* <IonList className="item-color-dark">
                <IonLabel>Maximum Capacity</IonLabel>
                <IonItem className="item-color-dark">
                  {venue.maxCapacity}
                </IonItem>
              </IonList> */}
              {/* <div className="addvenue-btns">
                <IonButton className="addvenue-editbtn">Edit</IonButton>
                <IonButton
                  className="addvenue-rmvbtn"
                  onClick={handleCancelClick}
                >
                  Remove
                </IonButton>
              </div> */}
            </IonCardContent>
          </IonCard>
        ))}

      {/* cancel Modal */}
      {/* <IonModal
        isOpen={showcancelModal}
        onDidDismiss={() => setShowcancelModal(false)}
        className="vevent-cancel-modal-container"
      >
        <IonContent className="vevent-cancel-modal-content">
          <h2 className="vevent-cancel-modal-txt">Remove this venue?</h2>
          <div className="vevent-modal-btn-container">
            <IonButton
              expand="block"
              className="vyes-btn"
              onClick={() => handlecancel(true)}
            >
              Yes
            </IonButton>
            <IonButton
              expand="block"
              className="vno-btn"
              onClick={() => handlecancel(false)}
            >
              No
            </IonButton>
          </div>
        </IonContent>
      </IonModal> */}
    </>
  );
};

export default VenueCard;

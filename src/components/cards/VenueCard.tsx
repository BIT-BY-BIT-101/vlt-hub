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
import React, { useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import { VenueDataModel } from "../../models/Model";

const VenueCard = () => {
  const { data: venueData } = useFirestore("venues");
  const [showcancelModal, setShowcancelModal] = useState(false);

  const handleCancelClick = () => {
    setShowcancelModal(true);
  };

  const handlecancel = (confirmed: boolean) => {
    if (confirmed) {
      console.log("Venue removed!");
    }
    setShowcancelModal(false);
  };
  return (
    <>
      {venueData &&
        venueData.map((venue: VenueDataModel) => (
          <IonCard key={venue.id} className="addvenue-card">
            <IonCardHeader>
              <IonCardTitle className="addvenue-title">
                {venue.name}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonLabel>Description</IonLabel>
                <IonItem>{venue.description}</IonItem>
              </IonList>
              <IonList>
                <IonLabel>Address</IonLabel>
                <IonItem>
                  {venue.bldg_no} {venue.street} {venue.city}
                </IonItem>
              </IonList>
              <IonList>
                <IonLabel>Maximum Capacity</IonLabel>
                <IonItem>{venue.maxCapacity}</IonItem>
              </IonList>
              <div className="addvenue-btns">
                <IonButton className="addvenue-editbtn">Edit</IonButton>
                <IonButton
                  className="addvenue-rmvbtn"
                  onClick={handleCancelClick}
                >
                  Remove
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        ))}

      {/* cancel Modal */}
      <IonModal
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
      </IonModal>
    </>
  );
};

export default VenueCard;

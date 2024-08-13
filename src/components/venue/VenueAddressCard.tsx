import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React, { useContext } from "react";
import PrimaryButton from "../PrimaryButton";
import { AuthContext } from "../../context/AuthContext";
import useQueryDoc from "../../hooks/useQueryDoc";
import useFetchVenueDetails from "../../hooks/useFetchVenueDetails";
import { handleWindowRoute } from "../../helpers/helpers";

const VenueAddressCard = () => {
  const { currentUser } = useContext(AuthContext);
  // const { data: venueDetails } = useQueryDoc("venues", "456");
  const { data: venueDetails } = useFetchVenueDetails();

  return (
    <IonCol>
      <IonCard className="card">
        <IonCardHeader>
          <IonCardTitle className="text-color-dark">Venue Info</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {venueDetails === null && (
            <IonItem className="item-color">
              <IonButtons slot="end">
                <PrimaryButton
                  slot="end"
                  // routerLink="/venue/add-venue"
                  onClick={() => handleWindowRoute("/venue/add-venue")}
                >
                  Add Venue
                </PrimaryButton>
              </IonButtons>
            </IonItem>
          )}
          {venueDetails !== null ? (
            <>
              <IonItem className="item-color">
                <IonButtons slot="end">
                  <PrimaryButton
                    slot="end"
                    routerLink={`/venue/profile/venue-details/edit`}
                    onClick={() =>
                      handleWindowRoute(`/venue/profile/venue-details/edit`)
                    }
                  >
                    Edit Details
                  </PrimaryButton>
                </IonButtons>
              </IonItem>
              <IonItem className="item-color-dark">
                <IonLabel className="card-label">
                  <span className="card-title">Venue Name: </span>
                  {venueDetails?.name}
                </IonLabel>
              </IonItem>
              <IonItem className="item-color-dark">
                <IonLabel className="card-label">
                  <span className="card-title">Venue Address: </span>
                  {venueDetails?.bldg_no} {venueDetails?.street}{" "}
                  {venueDetails?.baranggay}, {venueDetails?.city}
                </IonLabel>
              </IonItem>
            </>
          ) : (
            <p>No Venue Added</p>
          )}
        </IonCardContent>
      </IonCard>
    </IonCol>
  );
};

export default VenueAddressCard;

import {
  IonButton,
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
import { handleWindowRoute } from "../../helpers/Helpers";

const VenueAddressCard = () => {
  const { currentUser } = useContext(AuthContext);
  // const { data: venueDetails } = useQueryDoc("venues", "456");
  const { data: venueDetails } = useFetchVenueDetails();

  return (
    // <IonCol>
    <IonCard className="card card-border">
      <IonCardHeader>
        <IonCardTitle className="text-color-dark">Venue Info</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {venueDetails === null && (
          <IonItem className="item-bg-none">
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
              {/* <IonButtons slot="end">
                  <PrimaryButton
                    slot="end"
                    routerLink={`/venue/profile/venue-details/edit`}
                    onClick={() =>
                      handleWindowRoute(`/venue/profile/venue-details/edit`)
                    }
                  >
                    Edit Details
                  </PrimaryButton>
                </IonButtons> */}
              <IonButton
                shape="round"
                slot="end"
                onClick={() =>
                  handleWindowRoute(`/venue/profile/venue-details/edit`)
                }
              >
                Edit Details
              </IonButton>
            </IonItem>
            <IonItem className="item-bg-none">
              <IonLabel className="card-label">
                <span className="card-title">Venue Name: </span>
                {venueDetails?.name}
              </IonLabel>
            </IonItem>
            <IonItem className="item-bg-none">
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
    // </IonCol>
  );
};

export default VenueAddressCard;

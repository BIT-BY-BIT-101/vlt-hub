import {
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useContext } from "react";
import useQuery from "../../hooks/useQuery";
import { AuthContext } from "../../context/AuthContext";

const FacilityCard = () => {
  const { currentUser } = useContext(AuthContext);
  const { data: facilityData } = useQuery(
    "facilities",
    "venueId",
    "==",
    currentUser?.data.venueId
  );
  return (
    <>
      {facilityData?.map((facility: any) => (
        <IonCard className="card" key={facility.id}>
          <IonList className="item-color-dark ion-margin-top">
            <IonItem
              className="item-color"
              lines="none"
              routerLink={`/venue/facility/${facility.id}`}
            >
              <IonLabel>{facility.name}</IonLabel>
              <IonButton fill="outline" shape="round" color={"tertiary"}>
                Events
              </IonButton>
              <IonIcon
                icon={closeCircle}
                slot="end"
                className="text-color-dark cursor-pointer"
              />
            </IonItem>
          </IonList>
        </IonCard>
      ))}
    </>
  );
};

export default FacilityCard;

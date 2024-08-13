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
    <IonCard className="card">
      <IonList className="item-color-dark ion-margin-top">
        {facilityData?.map((facility: any) => (
          <IonItem className="item-color">
            <IonLabel>{facility.name}</IonLabel>
            <IonIcon
              icon={closeCircle}
              slot="end"
              className="text-color-dark cursor-pointer"
            />
            <IonButton fill="outline" shape="round" color={"tertiary"}>
              Events
            </IonButton>
          </IonItem>
        ))}
      </IonList>
    </IonCard>
  );
};

export default FacilityCard;

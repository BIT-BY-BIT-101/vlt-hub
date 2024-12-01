import {
  IonCardTitle,
  IonItem,
  IonLabel,
  IonImg,
  IonButton,
  IonIcon,
  IonCardContent,
} from "@ionic/react";
import { createSharp, arrowUpCircleSharp } from "ionicons/icons";
import React from "react";
import {
  formatDateString,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
import { useParams } from "react-router";
import useGetKYC from "../../hooks/useGetKYC";

type RouteParams = {
  id: string;
};

const KYCDetails = () => {
  const { id } = useParams<RouteParams>();

  const { data: kycData, loading, error } = useGetKYC(id);

  return (
    <>
      <div className="event-page ion-margin-top ion-padding margin-left margin-right">
        <IonCardTitle>
          <IonItem color={"none"} className="ion-text-center" lines="none">
            <IonLabel className="ion-text-center">
              <h1
                style={{
                  fontWeight: "bold",
                  color: "var(--ion-color-primary)",
                }}
              >
                {kycData?.title}
              </h1>
            </IonLabel>
          </IonItem>
        </IonCardTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IonImg
            src={kycData?.imageUrl}
            style={{ objectFit: "cover", height: "400px", width: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default KYCDetails;

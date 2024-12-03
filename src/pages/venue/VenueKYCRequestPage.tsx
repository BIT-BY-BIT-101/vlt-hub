import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import React from "react";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import RequestItems from "../../components/venue/RequestItems";
import VerificationRequest from "../../components/venue/VerificationRequest";

const VenueKYCRequestPage: React.FC = () => {
  return (
    <>
      {/* <VenueNavMenu /> */}
      <Menus />
      <IonPage id="main">
        <Header />
        <IonContent id="main">
          <IonGrid>
            <IonRow>
              {/* <SidePanel /> */}
              <IonCol>
                <VerificationRequest />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueKYCRequestPage;

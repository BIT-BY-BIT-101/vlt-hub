import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import React from "react";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import VerificationRequest from "../../components/venue/VerificationRequest";

const VenueKYCEditPage: React.FC = () => {
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
              <IonCol></IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueKYCEditPage;

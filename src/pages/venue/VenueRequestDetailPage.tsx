import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import React from "react";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import RequestDetails from "../../components/venue/RequestDetails";

const VenueRequestDetailPage: React.FC = () => {
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
                <RequestDetails />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueRequestDetailPage;

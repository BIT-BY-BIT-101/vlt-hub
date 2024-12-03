import React from "react";
import AddEvent from "../../components/venue/AddEvent";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";

const VenueAddEventPage: React.FC = () => {
  return (
    <>
      <Menus />
      <IonPage id="main">
        <Header />
        <IonContent>
          <IonGrid>
            <IonRow>
              {/* <SidePanel /> */}
              <IonCol>
                <AddEvent />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueAddEventPage;

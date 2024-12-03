import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonButton,
} from "@ionic/react";
import React from "react";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import FacilityCard from "../../components/venue/FacilityCard";
import EventItem from "../../components/venue/EventItem";

const VenueFacilityListEventPage: React.FC = () => {
  return (
    <>
      <Menus />
      <IonPage id="main">
        <Header />
        <IonContent>
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              {/* <SidePanel /> */}
              <IonCol>
                <EventItem />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueFacilityListEventPage;

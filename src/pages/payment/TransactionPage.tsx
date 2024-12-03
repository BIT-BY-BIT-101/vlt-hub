import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import React from "react";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import SidePanel from "../../components/SidePanel";
import VenueCard from "../../components/venue/VenueCard";
import TransactionList from "../../components/TransactionList";

const TransactionPage: React.FC = () => {
  return (
    <>
      {/* <VenueNavMenu /> */}
      <Menus />
      <IonPage>
        <Header />
        <IonContent id="main">
          <IonGrid>
            <IonRow>
              <SidePanel />
              <IonCol>
                <TransactionList />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default TransactionPage;

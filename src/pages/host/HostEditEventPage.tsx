import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import React from "react";
import Header from "../../components/header/Header";
import CreateEvent from "../../components/host/CreateEvent";
import Menus from "../../components/menus/Menus";
import EditEvent from "../../components/host/EditEvent";

const HostEditEventPage = () => {
  return (
    <>
      {/* <HostNavMenu /> */}
      <Menus />
      <IonPage id="main">
        <Header />

        <IonContent>
          <IonGrid>
            <IonRow>
              {/* <SidePanel /> */}
              <IonCol>
                <EditEvent />
              </IonCol>
            </IonRow>
          </IonGrid>
          {/* <div className="hhome-form-container"></div> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostEditEventPage;

import { IonPage, IonContent, IonCol, IonGrid, IonRow } from "@ionic/react";
import Menus from "../../components/menus/Menus";
import Header from "../../components/header/Header";
import RegisteredEventsCard from "../../components/participant/RegisteredEventsCard";
import SidePanel from "../../components/SidePanel";
import RegisteredEventDetails from "../../components/participant/RegisteredEventDetails";

const ParticipantRegsiteredEventDetailPage = () => {
  return (
    <>
      {/* <ParticipantNavMenu /> */}
      <Menus />
      <IonPage id="main">
        <Header />

        <IonContent>
          <IonGrid>
            <IonRow>
              {/* <ParticipantSidePane /> */}
              {/* <SidePanel /> */}
              <IonCol>
                <RegisteredEventDetails />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ParticipantRegsiteredEventDetailPage;

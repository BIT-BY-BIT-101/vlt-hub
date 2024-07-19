import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import ProfileCard from "../../components/cards/ProfileCard";
import Header from "../../components/header/Header";
import SidePanel from "../../components/SidePanel";
import Menus from "../../components/menus/Menus";

export const VenueProfilePage = () => {
  return (
    <>
      <IonPage>
        <Menus />
        <Header />
        <IonContent id="main">
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              {/* <ParticipantSidePane /> */}
              <SidePanel />
              <IonCol size="10">
                <ProfileCard />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

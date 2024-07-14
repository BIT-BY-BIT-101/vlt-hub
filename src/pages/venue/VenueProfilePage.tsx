import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import ProfileCard from "../../components/cards/ProfileCard";
import Header from "../../components/header/Header";
import SidePanel from "../../components/SidePanel";
import Menus from "../../components/menus/Menus";

export const VenueProfilePage = () => {
  return (
    <IonPage>
      <Menus />
      {/* <ParticipantHeader /> */}
      <Header />
      <IonContent>
        <IonGrid>
          <IonRow>
            {/* <ParticipantSidePane /> */}
            <SidePanel />
            <IonCol size="10">
              <ProfileCard />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

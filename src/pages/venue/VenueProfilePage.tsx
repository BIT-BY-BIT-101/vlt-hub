import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import ProfileCard from "../../components/cards/ProfileCard";
import Header from "../../components/header/Header";
import SidePanel from "../../components/SidePanel";
import Menus from "../../components/menus/Menus";
import VenueAddressCard from "../../components/venue/VenueAddressCard";

export const VenueProfilePage = () => {
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
                <ProfileCard />
                <br />
                <VenueAddressCard />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

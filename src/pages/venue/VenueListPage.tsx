import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import VenueCard from "../../components/venue/VenueCard";
import VenueNavMenu from "../../components/menus/VenueNavMenu";
import "./VenueListPage.css";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import SidePanel from "../../components/SidePanel";

const VenueListPage = () => {
  return (
    <>
      <Menus />
      <IonPage id="main">
        <Header />
        <IonContent>
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              <SidePanel />
              <IonCol>
                <IonButton
                  className="vlistpage-btn"
                  routerLink="/venue/add-venue"
                >
                  Add Venue
                </IonButton>
                <VenueCard />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueListPage;

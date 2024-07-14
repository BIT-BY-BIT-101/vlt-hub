import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import VenueCard from "../../components/venue/VenueCard";
import VenueNavMenu from "../../components/menus/VenueNavMenu";
import "./VenueListPage.css";
import Header from "../../components/header/Header";

const VenueListPage = () => {
  return (
    <>
      <VenueNavMenu />
      <IonPage id="main">
        <Header />
        <IonContent>
          <IonButton className="vlistpage-btn" routerLink="/venue/add-venue">
            Add Venue
          </IonButton>
          <VenueCard />
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueListPage;

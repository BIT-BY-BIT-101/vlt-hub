import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
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
import FacilityCard from "../../components/venue/FacilityCard";

const VenueListPage = () => {
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
                <IonItem className="item-bg-none">
                  <IonButton routerLink="/venue/add-room" slot="end">
                    <span>Add Facility</span>
                  </IonButton>
                </IonItem>
                <FacilityCard />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueListPage;

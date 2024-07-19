import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import AddVenue from "../../components/venue/AddVenue";
import "./../../components/venue/AddVenue.css";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import SidePanel from "../../components/SidePanel";

const VenueAddVenuePage = () => {
  const history = useHistory();
  return (
    <IonPage>
      <Menus />
      {/* <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={history.goBack}>Back</IonButton>
          </IonButtons>
          <IonTitle slot="end">Add Venue</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <Header />
      <IonContent id="main">
        <IonGrid>
          <IonRow>
            <SidePanel />
            <IonCol>
              <AddVenue />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default VenueAddVenuePage;

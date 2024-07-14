import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import AddVenue from "../../components/venue/AddVenue";
import "./../../components/venue/AddVenue.css";
import Header from "../../components/header/Header";

const VenueAddVenuePage = () => {
  const history = useHistory();
  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={history.goBack}>Back</IonButton>
          </IonButtons>
          <IonTitle slot="end">Add Venue</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <Header />
      <IonContent>
        <AddVenue />
      </IonContent>
    </IonPage>
  );
};

export default VenueAddVenuePage;

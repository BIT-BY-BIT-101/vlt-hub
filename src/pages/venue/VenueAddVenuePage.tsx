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

const VenueAddVenuePage: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <Menus />
      <IonPage id="main">
        <Header />
        <IonContent>
          <IonGrid>
            <IonRow>
              {/* <SidePanel /> */}
              <IonCol>
                <AddVenue />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueAddVenuePage;

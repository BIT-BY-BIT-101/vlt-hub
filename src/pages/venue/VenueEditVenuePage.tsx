import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import SidePanel from "../../components/SidePanel";
import AddVenue from "../../components/venue/AddVenue";
import EditVenue from "../../components/venue/EditVenue";

const VenueEditVenuePage: React.FC = () => {
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
                <EditVenue />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueEditVenuePage;

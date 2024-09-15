import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import "./ParticipantEventPage.css";
import EventsDetailCard from "../../components/participant/EventDetail";
import { useHistory } from "react-router";
import Menus from "../../components/menus/Menus";

const ParticipantEventDetailPage: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <Menus />
      {/* <ParticipantNavMenu /> */}
      <IonPage id="main">
        <IonHeader>
          <IonToolbar>
            <div className="back-button">
              <IonButton
                color={"dark"}
                fill="clear"
                slot="start"
                onClick={history.goBack}
              >
                Back
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <EventsDetailCard />
        </IonContent>
      </IonPage>
    </>
  );
};

export default ParticipantEventDetailPage;

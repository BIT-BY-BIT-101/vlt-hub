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
import EventsDetailCard from "../../components/participant/EventsDetailCard";
import { useHistory } from "react-router";

const ParticipantEventDetailPage: React.FC = () => {
  const history = useHistory();
  return (
    <>
      {/* <ParticipantNavMenu /> */}
      <IonPage>
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

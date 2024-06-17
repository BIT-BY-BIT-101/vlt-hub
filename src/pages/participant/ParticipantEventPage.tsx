import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import React from "react";
import ParticipantNavMenu from "../../components/menus/ParticipantNavMenu";
import "./ParticipantEventPage.css";
import ParticipantHeader from "../../components/participant/ParticipantHeader";
import RegisteredEventsCard from "../../components/participant/RegisteredEventsCard";
import ParticipantSidePane from "../../components/participant/ParticipantSidePane";

const ParticipantEventPage: React.FC = () => {
  // const events = [
  //   {
  //     date: "Wednesday, November 29, 2023",
  //     title:
  //       "Meta Safety in the Modern Age - Strategies for a Secure Digital Journey",
  //     hostname: "Abdul Rauf M. Sultan",
  //     hostImg: HostImg,
  //     venue: "Zoom",
  //     time: "1:00PM - 3:00PM",
  //   },
  //   {
  //     date: "Friday, December 1, 2023",
  //     title: "#TechyThursdays - Introduction to Web 3.0",
  //     hostname: "Jean Irish Mer",
  //     hostImg: HostImg2,
  //     venue: "Zoom",
  //     time: "3:00PM - 5:00PM",
  //   },
  // ];

  return (
    <>
      <ParticipantNavMenu />
      <IonPage>
        <ParticipantHeader />

        <IonContent id="phome-main">
          <IonGrid>
            <IonRow>
              <ParticipantSidePane />
              <IonCol size="10">
                <IonRow>
                  <RegisteredEventsCard />
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ParticipantEventPage;

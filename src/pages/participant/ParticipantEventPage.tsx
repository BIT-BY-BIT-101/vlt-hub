import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import ParticipantNavMenu from "../../components/menus/ParticipantNavMenu";
import "./ParticipantEventPage.css";

const ParticipantEventPage = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e: CustomEvent) => {
    setSearchText(e.detail.value);
  };

  const events = [
    {
      date: "WEDNESDAY, NOVEMBER 29, 2023",
      title:
        "Meta Safety in the Modern Age - Strategies for a Secure Digital Journey",
      venue: "Zoom",
      time: "1:00PM - 3:00PM",
    },
    {
      date: "FRIDAY, DECEMBER 1, 2023",
      title: "#TechyThursdays - Introduction to Web 3.0",
      venue: "Zoom",
      time: "3:00PM - 5:00PM",
    },
  ];

  const filteredEvents = searchText
    ? events.filter((event) =>
        event.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : events;

  return (
    <IonPage>
      <ParticipantNavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>My Events</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="phome-main">
        <IonSearchbar
          className="psearch-bar"
          placeholder="Search events"
          onIonChange={handleSearchChange}
        ></IonSearchbar>
        {filteredEvents.map((event, index) => (
          <React.Fragment key={index}>
            <h1 className="pevent-date">{event.date}</h1>
            <IonCard className="pevent-card">
              <IonCardHeader>
                <IonCardTitle>{event.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="pevent-venue">
                  <span>Venue: </span>
                  {event.venue}
                </div>
                <div className="pevent-time">
                  <span>Time: </span>
                  {event.time}
                </div>
                <div className="peventcard-btn">
                  <IonButton className="pview-btn">View</IonButton>
                  <IonButton className="pcancel-btn">Cancel</IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </React.Fragment>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default ParticipantEventPage;

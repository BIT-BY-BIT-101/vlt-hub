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
import HostNavMenu from "../../components/menus/HostNavMenu";
import "./HostEventPage.css";

const HostEventPage = () => {
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
    },
    {
      date: "FRIDAY, DECEMBER 1, 2023",
      title: "#TechyThursdays - Introduction to Web 3.0",
      venue: "Zoom",
    },
  ];

  const filteredEvents = searchText
    ? events.filter((event) =>
        event.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : events;

  return (
    <IonPage>
      <HostNavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>My Events</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="hhome-main">
        <IonSearchbar
          className="search-bar"
          placeholder="Search events"
          onIonChange={handleSearchChange}
        ></IonSearchbar>
        {filteredEvents.map((event, index) => (
          <React.Fragment key={index}>
            <h1 className="event-date">{event.date}</h1>
            <IonCard className="event-card">
              <IonCardHeader>
                <IonCardTitle>{event.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Venue: {event.venue}
                <div className="eventcard-btn">
                  <IonButton className="view-btn">View</IonButton>
                  <IonButton className="cancel-btn">Cancel</IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </React.Fragment>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default HostEventPage;

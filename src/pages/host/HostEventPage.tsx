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
    <>
      <IonPage>
        <HostNavMenu />
        <IonHeader>
          <IonToolbar>
            <IonMenuButton autoHide={false} slot="start" />
            <IonTitle>My Events</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="hhome-main">
          <IonSearchbar
            className="hsearch-bar"
            placeholder="Search events"
            onIonChange={handleSearchChange}
          ></IonSearchbar>
          {filteredEvents.map((event, index) => (
            <React.Fragment key={index}>
              <h1 className="hevent-date">{event.date}</h1>
              <IonCard className="hevent-card">
                <IonCardHeader>
                  <IonCardTitle>{event.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="hevent-venue">
                    <span>Venue: </span>
                    {event.venue}
                  </div>
                  <div className="hevent-time">
                    <span>Time: </span>
                    {event.time}
                  </div>
                  <div className="heventcard-btn">
                    <IonButton className="hview-btn">View</IonButton>
                    <IonButton className="hcancel-btn">Cancel</IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </React.Fragment>
          ))}
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostEventPage;

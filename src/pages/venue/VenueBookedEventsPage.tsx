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
import HostImg from "../../assets/host.jpg";
import HostImg2 from "../../assets/host2.jpg";
import VenueNavMenu from "../../components/menus/VenueNavMenu";
import "./VenueBookedEventsPage.css";

const VenueBookedEventsPage = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e: CustomEvent) => {
    setSearchText(e.detail.value);
  };

  const events = [
    {
      date: "WEDNESDAY, NOVEMBER 29, 2023",
      title:
        "Meta Safety in the Modern Age - Strategies for a Secure Digital Journey",
      hostname: "Abdul Rauf M. Sultan",
      hostImg: HostImg,
    },
    {
      date: "FRIDAY, DECEMBER 1, 2023",
      title: "#TechyThursdays - Introduction to Web 3.0",
      hostname: "Jean Irish Mer",
      hostImg: HostImg2,
    },
  ];

  const filteredEvents = searchText
    ? events.filter((event) =>
        event.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : events;

  return (
    <IonPage>
      <VenueNavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Booked Events</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="vhome-main">
        <IonSearchbar
          className="vsearch-bar"
          placeholder="Search booked events"
          onIonChange={handleSearchChange}
        ></IonSearchbar>
        {filteredEvents.map((event, index) => (
          <React.Fragment key={index}>
            <h1 className="vevent-date">{event.date}</h1>
            <IonCard className="vevent-card">
              <IonCardHeader>
                <IonCardTitle>{event.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="vevent-host-info">
                  <img
                    src={event.hostImg}
                    alt={`Host: ${event.hostname}`}
                    className="vevent-host-img"
                  />
                  <div className="vevent-host-name">{event.hostname}</div>
                </div>
                <div className="veventcard-btn">
                  <IonButton className="vview-btn">View</IonButton>
                  <IonButton className="vcancel-btn">Cancel</IonButton>
                </div>
                <div className="vchat-btn-container">
                  <IonButton className="vchat-btn">Chat</IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </React.Fragment>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default VenueBookedEventsPage;

import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useState } from "react";
import HostImg from "../../assets/host.jpg";
import HostImg2 from "../../assets/host2.jpg";
import MetaSafety from "../../assets/metasafety.jpg";
import VenueNavMenu from "../../components/menus/VenueNavMenu";
import "./VenueBookedEventsPage.css";
import Header from "../../components/header/Header";
import SidePanel from "../../components/SidePanel";
import Menus from "../../components/menus/Menus";
import VenueEventCalendar from "../../components/venue/VenueEventCalendar";

const VenueBookedEventsPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showPoster, setShowPoster] = useState(false);
  const [showcancelModal, setShowcancelModal] = useState(false);

  const handleSearchChange = (e: CustomEvent) => {
    setSearchText(e.detail.value);
  };

  const openModal = (event: any) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setShowModal(false);
  };

  const handleCancelClick = () => {
    setShowcancelModal(true);
  };

  const events = [
    {
      date: "Wednesday, November 29, 2023",
      title:
        "Meta Safety in the Modern Age - Strategies for a Secure Digital Journey",
      hostname: "Abdul Rauf M. Sultan",
      hostImg: HostImg,
      venue: "Zoom",
      time: "1:00PM - 3:00PM",
    },
    {
      date: "Friday, December 1, 2023",
      title: "#TechyThursdays - Introduction to Web 3.0",
      hostname: "Jean Irish Mer",
      hostImg: HostImg2,
      venue: "Zoom",
      time: "3:00PM - 5:00PM",
    },
  ];

  const filteredEvents = searchText
    ? events.filter((event) =>
        event.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : events;

  const handlecancel = (confirmed: boolean) => {
    if (confirmed) {
      console.log("Event canceled!");
    }

    setShowcancelModal(false);
  };
  return (
    <>
      <Menus />
      <IonPage id="main">
        <Header />

        <IonContent id="main">
          <IonGrid>
            <IonRow>
              {/* <SidePanel /> */}
              <IonCol>
                {/* <IonSearchbar
            className="vsearch-bar"
            placeholder="Search events"
            onIonChange={handleSearchChange}
          ></IonSearchbar> */}
                <VenueEventCalendar />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default VenueBookedEventsPage;

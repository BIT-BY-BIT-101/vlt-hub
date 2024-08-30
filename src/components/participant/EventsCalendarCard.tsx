import { IonCard, IonCardContent } from "@ionic/react";
import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { auth } from "../../config/firebase";
import useQuery from "../../hooks/useQuery";
import { formatDateOnly } from "../../helpers/DateTimeFunctions";
import { useHistory } from "react-router";
import Loader from "../loaders/Loader";

const EventsCalendarCard = () => {
  const history = useHistory();
  const {
    data: events,
    error,
    loading,
  } = useQuery(
    "events",
    "participants",
    "array-contains",
    auth.currentUser?.uid!
  );

  const handleEventClick = (info) => {
    // Handle event click here
    console.log("Event clicked:", info.event.title);
    console.log(info.event.id);

    history.push(`/participant/event/details/${info.event.id}`);
    // alert(`Event: ${info.event.title}\nDate: ${info.event.event_date}`);
    // You can add custom logic here, like opening a modal with event details
  };

  if (loading) {
    return <Loader />;
  }

  return (
    // <IonCard className="card">
    //   <IonCardContent>
    <div className="cars">
      <FullCalendar
        height="100%"
        contentHeight={"auto"}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        eventClick={handleEventClick}
        events={events.map((event) => ({
          id: event.id,
          title: event.title,
          date: formatDateOnly(event.event_date),
        }))}
      />
    </div>
    //   </IonCardContent>
    // </IonCard>
  );
};

export default EventsCalendarCard;

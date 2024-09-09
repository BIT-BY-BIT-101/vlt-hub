import { IonCard, IonCardContent } from "@ionic/react";
import React, { useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import { auth } from "../../config/firebase";
import useQuery from "../../hooks/useQuery";
import { formatDateOnly } from "../../helpers/DateTimeFunctions";
import { useHistory } from "react-router";
import Loader from "../loaders/Loader";
import useFetchParticipantingEvents from "../../hooks/useFetchParticipantingEvents";

const EventsCalendarCard = () => {
  const history = useHistory();
  const { data: events, loading, error } = useFetchParticipantingEvents();
  useEffect(() => {
    window.setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1000);
  });

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
    <div className="card">
      <FullCalendar
        height="100%"
        contentHeight={"auto"}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleEventClick}
        // eventClick={handleEventClick}
        // events={events.map((event) => ({
        //   id: event?.id,
        //   title: event?.title,
        //   date: formatDateOnly(event?.event_date),
        // }))}

        events={events}
      />
    </div>
    //   </IonCardContent>
    // </IonCard>
  );
};

export default EventsCalendarCard;

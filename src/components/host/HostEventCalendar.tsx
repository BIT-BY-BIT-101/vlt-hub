import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { auth } from "../../config/firebase";
import {
  extractDateOnly,
  extractTimeFromDateTime,
  formatDateOnly,
} from "../../helpers/DateTimeFunctions";
import useQuery from "../../hooks/useQuery";
import Loader from "../loaders/Loader";
import useGetHostedEvent from "../../hooks/useFetchHostedEvents";
import useFetchHostedEvents from "../../hooks/useFetchHostedEvents";
import { Interaction } from "@fullcalendar/core/internal";

const HostEventCalendar = () => {
  const history = useHistory();
  const { data: events, loading, error } = useFetchHostedEvents();

  // console.log(events);

  useEffect(() => {
    window.setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1000);
  });

  const eventMap = events?.map((event) => ({
    id: event?.id,
    title: event?.title,
    start:
      extractDateOnly(event?.event_date) +
      extractTimeFromDateTime(event?.start_time),
    end:
      extractDateOnly(event?.event_date) +
      extractTimeFromDateTime(event?.end_time),
  }));

  console.log(eventMap);

  const handleEventClick = (info) => {
    // Handle event click here
    console.log("Event clicked:", info.event.title);
    console.log(info.event.id);

    history.push(`/host/event/details/${info.event.id}`);
    // alert(`Event: ${info.event.title}\nDate: ${info.event.event_date}`);
    // You can add custom logic here, like opening a modal with event details
  };

  if (loading) {
    return <Loader />;
  }

  return (
    // <IonCard className="card">
    //   <IonCardContent>
    <div className="card ion-padding">
      <FullCalendar
        height="100%"
        contentHeight={"auto"}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventClick={handleEventClick}
        events={events.map((event) => ({
          id: event?.id,
          title: event?.title,
          start:
            extractDateOnly(event?.event_date) +
            extractTimeFromDateTime(event?.start_time),
          end:
            extractDateOnly(event?.event_date) +
            extractTimeFromDateTime(event?.end_time),
        }))}
      />
    </div>
    //   </IonCardContent>
    // </IonCard>
  );
};

export default HostEventCalendar;

import { IonCard, IonCardContent } from "@ionic/react";
import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { auth } from "../../config/firebase";
import useQuery from "../../hooks/useQuery";
import { formatDateOnly } from "../../helpers/DateTimeFunctions";

const EventsCalendarCard = () => {
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
  return (
    <IonCard className="card">
      <IonCardContent>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events.map((event) => ({
            title: event.title,
            date: formatDateOnly(event.event_date),
          }))}
          //   weekends={false}
          //   events={[
          //     { title: "event 1", date: "2024-08-30" },
          //     { title: "event 2", date: "2024-08-31" },
          //   ]}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default EventsCalendarCard;

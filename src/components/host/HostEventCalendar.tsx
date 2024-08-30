import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import React from "react";
import { useHistory } from "react-router";
import { auth } from "../../config/firebase";
import { formatDateOnly } from "../../helpers/DateTimeFunctions";
import useQuery from "../../hooks/useQuery";
import Loader from "../loaders/Loader";
import useGetHostedEvent from "../../hooks/useGetHostedEvent";

const HostEventCalendar = () => {
  const history = useHistory();
  const { data: events, loading, error } = useGetHostedEvent();
  //   const {
  //     data: events,
  //     error,
  //     loading,
  //   } = useQuery(
  //     "events",
  //     "participants",
  //     "array-contains",
  //     auth.currentUser?.uid!
  //   );

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
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        // eventClick={handleEventClick}
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

export default HostEventCalendar;

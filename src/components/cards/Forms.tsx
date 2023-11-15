import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonLoading,
  IonToast,
} from "@ionic/react";
import React, { useState } from "react";
import useFirestore from "../../hooks/useFirestore";

function Forms() {
  const { addData, error, loading, data, deleteData } = useFirestore("events");
  const [eventData, setEventData] = useState({
    event_name: "",
    event_description: "",
    host_id: "",
    event_date: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddEvent = () => {
    // const eventData = {
    //   event_name: "Your Event Name",
    //   event_description: "Your Event Description",
    //   host_id: "Host ID",
    //   event_date: "Event Date",
    // };

    addData(eventData);
  };

  const handleDeleteEvent = (id) => {
    // Call the delete function when the delete button is clicked
    deleteData(id);
  };
  return (
    <div id="container">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Card Title</IonCardTitle>
          <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <IonList>
            {data.map((event) => (
              <IonItem key={event.id}>
                <IonLabel>
                  <h2>{event.event_name}</h2>
                  <p>{event.event_description}</p>
                  <p>{event.host_id}</p>
                  <p>{event.event_date}</p>
                </IonLabel>
                <IonButton onClick={() => handleDeleteEvent(event.id)}>
                  Delete
                </IonButton>
              </IonItem>
            ))}
          </IonList>

          <IonLoading isOpen={loading} message={"Fetching Data..."} />

          <IonToast
            isOpen={!!error}
            message={`Error: ${error?.message || "Unknown error"}`}
            duration={5000}
          />

          <IonItem>
            <IonLabel position="stacked">New Data Text</IonLabel>
            <IonItem>
              <IonLabel position="stacked">Event Name</IonLabel>
              <IonInput
                name="event_name"
                value={eventData.event_name}
                onIonChange={handleInputChange}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Event Description</IonLabel>
              <IonInput
                name="event_description"
                value={eventData.event_description}
                onIonChange={handleInputChange}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Host ID</IonLabel>
              <IonInput
                name="host_id"
                value={eventData.host_id}
                onIonChange={handleInputChange}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Event Date</IonLabel>
              <IonInput
                name="event_date"
                value={eventData.event_date}
                onIonChange={handleInputChange}
              ></IonInput>
            </IonItem>
          </IonItem>

          <IonButton onClick={handleAddEvent}>Add Data to Firebase</IonButton>
          <IonLoading isOpen={loading} message={"Adding Event..."} />

          {error && <p>Error: {error.message}</p>}
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default Forms;

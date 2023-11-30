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
  IonImg,
} from "@ionic/react";
import React, { useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { useParams } from "react-router";

import useFirebaseStorage from "../../hooks/useFirestorage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { EventDataModel } from "../../models/Model";
// import * from "../../asset/"

function Forms() {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const {
    addData: addEvent,
    error,
    loading,
    data,
    deleteData,
  } = useFirestore("user_events");
  const { data: applicationData, addData: addApplication } =
    useFirestore("event_application");
  const [eventData, setEventData] = useState({
    event_name: "",
    event_description: "",
    host_id: "",
    event_date: "",
    event_imageUrl: imageUrl,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddEvent = async () => {
    if (imageUpload == null) return;
    const filename = `${Date.now()}_${imageUpload.name}`;
    const imageRef = ref(storage, `images/${filename}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
    });
    console.log(imageUpload.name, "Uploaded Successfully");
    console.log(imageUrl);
    await addEvent(eventData);
  };

  const handleDeleteEvent = (id: string) => {
    // Call the delete function when the delete button is clicked
    deleteData(id);
    console.log(id, "was deleted successfully");
  };

  return (
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
              <IonButton>Apply</IonButton>
              <IonButton onClick={() => handleDeleteEvent(event.id)}>
                Delete
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonLoading isOpen={loading} message={"Fetching Data..."} />

        <IonItem>
          <IonLabel position="stacked">New Data Text</IonLabel>
          <IonItem>
            <IonLabel position="stacked">Event Name</IonLabel>
            {/* <IonInput
              type="file"
              onIonChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            ></IonInput> */}
            <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files?.[0] || null);
              }}
            />
          </IonItem>
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
              type="date"
              name="event_date"
              value={eventData.event_date}
              onIonChange={handleInputChange}
            ></IonInput>
          </IonItem>
        </IonItem>

        <IonButton onClick={handleAddEvent}>Add Data to Firebase</IonButton>
        <IonLoading isOpen={loading} message={"Adding Event..."} />
      </IonCardContent>
    </IonCard>
  );
}

export default Forms;

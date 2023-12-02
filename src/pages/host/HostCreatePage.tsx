import {
  IonButton,
  IonCard,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonInput,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { ChangeEvent, useState } from "react";
import HostNavMenu from "../../components/menus/HostNavMenu";
import "./HostCreatePage.css";

const HostCreatePage = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [venueDate, setVenueDate] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [additionalVenueOptions, setAdditionalVenueOptions] = useState(false);
  const [additionalOnlineOptions, setAdditionalOnlineOptions] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const customVenueFormatOptions = {
    header: "Venue Format",
    message: "Choose mode",
    translucent: true,
  };
  const customVenueOptions = {
    header: "Venue",
    message: "Pick Location",
    translucent: true,
  };
  const customVenuePlatformOptions = {
    header: "Online Platform",
    message: "Choose Meeting Platform",
    translucent: true,
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    } else {
      setImagePreviewUrl(null);
    }
  };

  const handleVenueChange = (event: CustomEvent) => {
    const selectedVenue = event.detail.value;
    setVenue(selectedVenue);

    setAdditionalVenueOptions(selectedVenue === "on-site");

    setAdditionalOnlineOptions(selectedVenue === "online");
  };

  const handleOnlineOptionChange = (event: CustomEvent) => {
    const selectedOnlineOption = event.detail.value;
    console.log("Selected Online Option:", selectedOnlineOption);
  };

  const handleSubmit = () => {
    console.log("Event Title:", eventTitle);
    console.log("Event Description:", eventDescription);
    console.log("Venue Date:", venueDate);
    console.log("Venue:", venue);
  };

  return (
    <IonPage>
      <HostNavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Create</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="hhome-main">
        <div className="hhome-form-container">
          <IonCard className="hhome-card-container">
            <IonLabel className="hhome-form-label">
              <span className="hhome-form-title">Upload your poster:</span>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hhome-form-input-file"
              />
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="hhome-image-preview"
                />
              )}
            </IonLabel>

            <IonLabel className="hhome-form-label">
              <span className="hhome-form-title">Event Title:</span>
              <IonInput
                className="hhome-form-input"
                type="text"
                value={eventTitle}
                required
              />
            </IonLabel>

            <IonLabel className="hhome-form-label">
              <span className="hhome-form-title">Add a description:</span>
              <IonInput
                className="hhome-form-input"
                type="text"
                value={eventDescription}
              />
            </IonLabel>

            <IonLabel className="hhome-form-label">
              <span className="hhome-form-title">Venue Format:</span>
              <IonSelect
                interfaceOptions={customVenueFormatOptions}
                interface="alert"
                placeholder="Select venue type"
                value={venue}
                onIonChange={handleVenueChange}
              >
                <IonSelectOption value="online">Online</IonSelectOption>
                <IonSelectOption value="on-site">On Site</IonSelectOption>
              </IonSelect>
            </IonLabel>

            {additionalVenueOptions && (
              <IonLabel className="hhome-form-label">
                <span className="hhome-form-title">Choose a venue:</span>
                <IonSelect
                  placeholder="Select One"
                  interfaceOptions={customVenueOptions}
                >
                  <IonSelectOption value="smx-olongapo">
                    SMX Olongapo
                  </IonSelectOption>
                  <IonSelectOption value="travelers-hotel">
                    Travelers Hotel
                  </IonSelectOption>
                </IonSelect>
              </IonLabel>
            )}

            {additionalOnlineOptions && (
              <IonLabel className="hhome-form-label">
                <span className="hhome-form-title">Choose a platform:</span>
                <IonSelect
                  placeholder="Select One"
                  onIonChange={handleOnlineOptionChange}
                  interfaceOptions={customVenuePlatformOptions}
                >
                  <IonSelectOption value="zoom">Zoom</IonSelectOption>
                  <IonSelectOption value="google-meet">
                    Google Meet
                  </IonSelectOption>
                  <IonSelectOption value="ms-teams">MS Teams</IonSelectOption>
                </IonSelect>
              </IonLabel>
            )}

            <div className="date-time-row">
              <div className="date-time-item">
                <IonLabel className="hhome-form-label date-time-label">
                  <span className="hhome-form-title">Event Date:</span>
                  <div className="date-time-container">
                    <IonDatetimeButton datetime="date"></IonDatetimeButton>
                    <IonModal keepContentsMounted={true}>
                      <IonDatetime
                        presentation="date"
                        id="date"
                        min="2023-12-01"
                        max="2025-12-31"
                      ></IonDatetime>
                    </IonModal>
                  </div>
                </IonLabel>
              </div>

              <div className="date-time-item">
                <IonLabel className="hhome-form-label date-time-label">
                  <span className="hhome-form-title">Start Time:</span>
                  <div className="date-time-container">
                    <IonDatetimeButton datetime="time"></IonDatetimeButton>
                    <IonModal keepContentsMounted={true}>
                      <IonDatetime presentation="time" id="time"></IonDatetime>
                    </IonModal>
                  </div>
                </IonLabel>
              </div>

              <div className="date-time-item">
                <IonLabel className="hhome-form-label date-time-label">
                  <span className="hhome-form-title">End Time:</span>
                  <div className="date-time-container">
                    <IonDatetimeButton datetime="time"></IonDatetimeButton>
                    <IonModal keepContentsMounted={true}>
                      <IonDatetime presentation="time" id="time"></IonDatetime>
                    </IonModal>
                  </div>
                </IonLabel>
              </div>
            </div>

            <IonButton
              type="submit"
              expand="full"
              fill="clear"
              onClick={handleSubmit}
              className="hsubmit-btn"
            >
              <span className="hsubmit-txt">Submit</span>
            </IonButton>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HostCreatePage;

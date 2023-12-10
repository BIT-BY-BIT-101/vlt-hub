import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React from "react";
import HostImg from "../../assets/host.jpg";
import EventPoster from "../../assets/techythursdays.jpg";
import VenueNavMenu from "../../components/menus/VenueNavMenu";
import "./VenueRequestsPage.css";

const VenueRequestsPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  // const [showPosterPreviewModal, setShowPosterPreviewModal] =
  //   React.useState(false);

  const eventDetails = {
    description: "Lorem ipsum dolor sit amet",
    venue: "SMX Olongapo",
    date: "December 4, 2023",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  };

  return (
    <>
      <VenueNavMenu />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start" />
            <IonTitle>Requests</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent id="vhome-main">
          <IonGrid>
            <IonRow className="vhome-requests-row">
              {/* 1st Card */}
              <IonCol size="12" size-md="4">
                <IonCard className="vhome-requests-card">
                  <div
                    className="vhome-event-poster-container"
                    // onClick={() => setShowPosterPreviewModal(true)}
                  >
                    <IonImg
                      className="vhome-event-poster"
                      src={EventPoster}
                      alt="Event Poster"
                    />
                  </div>

                  <div className="vhome-host-container">
                    <IonAvatar className="vhome-host-img">
                      <IonImg src={HostImg} alt="Host IMG"></IonImg>
                    </IonAvatar>
                    <div className="vhome-host-name">Abdul Rauf M. Sultan</div>
                  </div>

                  <IonLabel>
                    <h2 className="vhome-event-title">
                      Meta Safety in the Modern Age - Strategies for a Secure
                      Digital Journey
                    </h2>
                  </IonLabel>

                  <div className="vhome-modalbtn-container">
                    <IonButton
                      onClick={() => setShowModal(true)}
                      expand="full"
                      className="vviewdetails-btn"
                    >
                      View Details
                    </IonButton>
                    <IonButton expand="full" className="vchat-btn">
                      Chat
                    </IonButton>
                  </div>
                </IonCard>
              </IonCol>

              {/* 2nd Card */}

              <IonCol size="12" size-md="4">
                <IonCard className="vhome-requests-card">
                  <div
                    className="vhome-event-poster-container"
                    // onClick={() => setShowPosterPreviewModal(true)}
                  >
                    <IonImg
                      className="vhome-event-poster"
                      src={EventPoster}
                      alt="Event Poster"
                    />
                  </div>

                  <div className="vhome-host-container">
                    <IonAvatar className="vhome-host-img">
                      <IonImg src={HostImg} alt="Host IMG"></IonImg>
                    </IonAvatar>
                    <div className="vhome-host-name">Abdul Rauf M. Sultan</div>
                  </div>

                  <IonLabel>
                    <h2 className="vhome-event-title">
                      Meta Safety in the Modern Age - Strategies for a Secure
                      Digital Journey
                    </h2>
                  </IonLabel>
                  <div className="vhome-modalbtn-container">
                    <IonButton
                      onClick={() => setShowModal(true)}
                      expand="full"
                      className="vviewdetails-btn"
                    >
                      View Details
                    </IonButton>
                    <IonButton expand="full" className="vchat-btn">
                      Chat
                    </IonButton>
                  </div>
                </IonCard>
              </IonCol>

              {/* 3rd Card */}

              <IonCol size="12" size-md="4">
                <IonCard className="vhome-requests-card">
                  <div
                    className="vhome-event-poster-container"
                    // onClick={() => setShowPosterPreviewModal(true)}
                  >
                    <IonImg
                      className="vhome-event-poster"
                      src={EventPoster}
                      alt="Event Poster"
                    />
                  </div>

                  <div className="vhome-host-container">
                    <IonAvatar className="vhome-host-img">
                      <IonImg src={HostImg} alt="Host IMG"></IonImg>
                    </IonAvatar>
                    <div className="vhome-host-name">Abdul Rauf M. Sultan</div>
                  </div>

                  <IonLabel>
                    <h2 className="vhome-event-title">
                      Meta Safety in the Modern Age - Strategies for a Secure
                      Digital Journey
                    </h2>
                  </IonLabel>

                  <div className="vhome-modalbtn-container">
                    <IonButton
                      onClick={() => setShowModal(true)}
                      expand="full"
                      className="vviewdetails-btn"
                    >
                      View Details
                    </IonButton>
                    <IonButton expand="full" className="vchat-btn">
                      Chat
                    </IonButton>
                  </div>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>

        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          className={`vhome-modal-container ${showModal ? "show-modal" : ""}`}
        >
          <IonContent
            className={`vhome-modal-content ${showModal ? "show-modal" : ""}`}
          >
            <div className="vhome-modal-header">
              <h2 className="vhome-modal-title">Event Details</h2>
              <IonIcon
                icon={close}
                size="large"
                onClick={() => setShowModal(false)}
                className="vhome-close-icon"
              />
            </div>
            <IonLabel className="vhome-modal-details">
              <p>
                <span>Description:</span> {eventDetails.description}
              </p>
              <p>
                <span>Venue:</span> {eventDetails.venue}
              </p>
              <p>
                <span>Date:</span> {eventDetails.date}
              </p>
              <p>
                <span>Start time:</span> {eventDetails.startTime}
              </p>
              <p>
                <span>End time:</span> {eventDetails.endTime}
              </p>
            </IonLabel>

            <div className="vhome-actionbtn-container">
              <IonButton className="vaccept-btn">Accept</IonButton>
              <IonButton className="vdecline-btn" fill="clear">
                Decline
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Poster Preview Modal */}
        {/* <IonModal
        isOpen={showPosterPreviewModal}
        onDidDismiss={() => setShowPosterPreviewModal(false)}
        className="vhome-modal-container"
      >
        <IonContent className="vhome-modal-content">
          <div className="vhome-modal-header">
            <IonIcon
              icon={close}
              size="large"
              onClick={() => setShowPosterPreviewModal(false)}
              className="vhome-close-icon"
            />
          </div>
          <IonImg
            className="vhome-event-poster"
            src={EventPoster}
            alt="Event Poster"
          />
        </IonContent>
      </IonModal> */}
      </IonPage>
    </>
  );
};

export default VenueRequestsPage;

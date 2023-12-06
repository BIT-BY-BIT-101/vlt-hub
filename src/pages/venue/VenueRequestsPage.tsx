import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import HostImg from "../../assets/host.jpg";
import EventPoster from "../../assets/techythursdays.jpg";
import VenueNavMenu from "../../components/menus/VenueNavMenu";
import "./VenueRequestsPage.css";

const VenueRequestsPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <IonPage>
      <VenueNavMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Requests</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="vhome-main">
        <IonGrid>
          <IonRow>
            <IonCol size="4">
              <IonCard className="vhome-requests-card">
                <div
                  className="vhome-event-poster-container"
                  onClick={() => setShowModal(true)}
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
                  <IonLabel className="vhome-event-details">
                    <p>
                      <span>Description:</span> Lorem ipsum dolor sit amet,
                    </p>
                    <p>
                      <span>Venue:</span> SMX Olongapo
                    </p>
                    <p>
                      <span>Date:</span> December 4, 2023
                    </p>
                    <p>
                      <span>Start time:</span> 10:00 AM
                    </p>
                    <p>
                      <span>Venue:</span> 12:00 PM
                    </p>
                  </IonLabel>
                </IonLabel>
                <div className="vhome-buttons-container">
                  <IonButton className="vaccept-btn">Accept</IonButton>
                  <IonButton className="vdecline-btn" fill="clear">
                    Decline
                  </IonButton>
                </div>
              </IonCard>
            </IonCol>

            <IonCol size="4">
              <IonCard className="vhome-requests-card">
                <div className="vhome-event-poster-container">
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
                  <IonLabel className="vhome-event-details">
                    <p>
                      <span>Description:</span> Lorem ipsum dolor sit amet,
                    </p>
                    <p>
                      <span>Venue:</span> SMX Olongapo
                    </p>
                    <p>
                      <span>Date:</span> December 4, 2023
                    </p>
                    <p>
                      <span>Start time:</span> 10:00 AM
                    </p>
                    <p>
                      <span>Venue:</span> 12:00 PM
                    </p>
                  </IonLabel>
                </IonLabel>
                <div className="vhome-buttons-container">
                  <IonButton className="vaccept-btn">Accept</IonButton>
                  <IonButton className="vdecline-btn" fill="clear">
                    Decline
                  </IonButton>
                </div>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard className="vhome-requests-card">
                <div className="vhome-event-poster-container">
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
                  <IonLabel className="vhome-event-details">
                    <p>
                      <span>Description:</span> Lorem ipsum dolor sit amet,
                    </p>
                    <p>
                      <span>Venue:</span> SMX Olongapo
                    </p>
                    <p>
                      <span>Date:</span> December 4, 2023
                    </p>
                    <p>
                      <span>Start time:</span> 10:00 AM
                    </p>
                    <p>
                      <span>Venue:</span> 12:00 PM
                    </p>
                  </IonLabel>
                </IonLabel>
                <div className="vhome-buttons-container">
                  <IonButton className="vaccept-btn">Accept</IonButton>
                  <IonButton className="vdecline-btn" fill="clear">
                    Decline
                  </IonButton>
                </div>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonContent>
          <IonImg
            className="vhome-event-poster-modal"
            src={EventPoster}
            alt="Event Poster"
          />
          <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default VenueRequestsPage;

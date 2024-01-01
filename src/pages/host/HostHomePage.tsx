import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useState } from "react";
import HostImg from "../../assets/host.jpg";
import IntrotoCSharp from "../../assets/introtocsharp.jpg";
import MetaSafety from "../../assets/metasafety.jpg";
import techythursdays from "../../assets/techythursdays.jpg";
import HostNavMenu from "../../components/menus/HostNavMenu";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import "./HostHomePage.css";

const HostHomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <HostNavMenu />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>
            {/* <IonMenuButton slot="start" /> */}
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent id="hhome-main">
          <div className="hhome-cards-container">
            <IonCard className="hhome-event-card" onClick={openModal}>
              <IonImg
                src={IntrotoCSharp}
                alt="Mastering the Fundamentals: An Introduction to Visual C# Programming."
                className="hhome-event-image"
              />
              <IonLabel>
                <h2
                  className="hhome-event-title"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    lineHeight: "20px",
                    maxHeight: "40px",
                  }}
                >
                  Mastering the Fundamentals: An Introduction to Visual C#
                  Programming
                </h2>
                <div className="hhome-event-host-container">
                  <IonImg
                    src={HostImg}
                    alt="Abdul Rauf M. Sultan"
                    className="hhome-event-host-img"
                  />
                  <p className="hhome-event-host">Abdul Rauf M. Sultan</p>
                </div>
                <IonLabel className="hhome-event-details">
                  <p>
                    <span>Venue:</span> Zoom
                  </p>
                  <p>
                    <span>Date:</span> October 15, 2023
                  </p>
                  <p>
                    <span>Time:</span> 3:00 PM - 5:00 PM
                  </p>
                  <p className="hhome-event-free">Free</p>
                </IonLabel>
              </IonLabel>
            </IonCard>

            <IonCard className="hhome-event-card" onClick={openModal}>
              <IonImg
                src={MetaSafety}
                alt="Meta Safety in the Modern Age - Strategies for a Secure Digital Journey"
                className="hhome-event-image"
              />
              <IonLabel>
                <h2
                  className="hhome-event-title"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    lineHeight: "20px",
                    maxHeight: "40px",
                  }}
                >
                  Meta Safety in the Modern Age - Strategies for a Secure
                  Digital Journey
                </h2>
                <div className="hhome-event-host-container">
                  <IonImg
                    src={HostImg}
                    alt="Abdul Rauf M. Sultan"
                    className="hhome-event-host-img"
                  />
                  <p className="hhome-event-host">Abdul Rauf M. Sultan</p>
                </div>
                <IonLabel className="hhome-event-details">
                  <p>
                    <span>Venue:</span> Zoom
                  </p>
                  <p>
                    <span>Date:</span> October 15, 2023
                  </p>
                  <p>
                    <span>Time:</span> 3:00 PM - 5:00 PM
                  </p>
                  <p className="hhome-event-paid">₱200.00</p>
                </IonLabel>
              </IonLabel>
            </IonCard>

            <IonCard className="hhome-event-card" onClick={openModal}>
              <IonImg
                src={techythursdays}
                alt="#TechyThursdays - Introduction to Web 3.0"
                className="hhome-event-image"
              />
              <IonLabel>
                <h2
                  className="hhome-event-title"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    lineHeight: "20px",
                    maxHeight: "40px",
                  }}
                >
                  #TechyThursdays - Introduction to Web 3.0
                </h2>
                <div className="hhome-event-host-container">
                  <IonImg
                    src={HostImg}
                    alt="Abdul Rauf M. Sultan"
                    className="hhome-event-host-img"
                  />
                  <p className="hhome-event-host">Abdul Rauf M. Sultan</p>
                </div>
                <IonLabel className="hhome-event-details">
                  <p>
                    <span>Venue:</span> Zoom
                  </p>
                  <p>
                    <span>Date:</span> October 15, 2023
                  </p>
                  <p>
                    <span>Time:</span> 3:00 PM - 5:00 PM
                  </p>
                  <p className="hhome-event-free">Free</p>
                </IonLabel>
              </IonLabel>
            </IonCard>

            {/* Modal */}
            <IonModal
              isOpen={showModal}
              onDidDismiss={closeModal}
              // className="hhome-modal-container"
            >
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="end">
                    <IonButton onClick={closeModal}>
                      <IonIcon icon={closeCircle} />
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>

              <IonContent className="hhome-modal-content">
                <div className="hhome-modal-event-info">
                  <p className="hhome-event-free">Free</p>
                  <h2 className="hhome-modal-title">
                    Mastering the Fundamentals: An Introduction to Visual C#
                    Programming
                  </h2>
                </div>
                <div className="hhome-modal-host-container">
                  <IonImg
                    src={HostImg}
                    alt="Abdul Rauf M. Sultan"
                    className="hhome-modal-host-img"
                  />
                  <p className="hhome-modal-host">Abdul Rauf M. Sultan</p>
                </div>
                <div className="hhome-modal-details">
                  <p>
                    <span>Description:</span> This course is designed to help
                    you master the fundamentals of Visual C# programming. It is
                    intended for absolute beginners with no prior programming
                    experience. The course focuses on the fundamentals of Visual
                    C# programming and covers the following topics: Visual C#
                    language syntax, program structure, and implementation
                    details.
                  </p>
                  <p>
                    <span>Venue:</span> Zoom
                  </p>
                  <p>
                    <span>Date:</span> October 15, 2023
                  </p>
                  <p>
                    <span>Time:</span> 3:00 PM - 5:00 PM
                  </p>
                </div>
              </IonContent>
            </IonModal>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostHomePage;

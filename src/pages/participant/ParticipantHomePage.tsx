import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import EventsCard from "../../components/participant/EventsCard";
import "./ParticipantHomePage.css";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import SidePanel from "../../components/SidePanel";
import EventSlides from "../../components/participant/EventSlides";

const ParticipantHomePage: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  if (currentUser?.data.role === "host" || currentUser?.data.role === "venue") {
    return history.push("/participant/signin");
    // return (window.location.href = "/participant/signin");
  }
  return (
    <>
      {/*<ParticipantNavMenu />*/}
      <Menus />
      <IonPage id="main">
        {/* <ParticipantHeader /> */}
        <Header />
        {/* <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>  
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <IonContent className="container">
          <IonGrid>
            <IonRow>
              {/* <SidePanel /> */}

              <IonCol size="12">
                <IonRow>
                  <EventSlides />
                </IonRow>
                <IonRow>
                  <IonTitle color={"dark"}>
                    <h1>Upcoming Events</h1>
                  </IonTitle>
                </IonRow>
                <IonRow style={{ marginLeft: "40px", marginRight: "40px" }}>
                  <EventsCard />
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ParticipantHomePage;

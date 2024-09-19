import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonTitle,
} from "@ionic/react";
import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import EventsCard from "../../components/participant/EventsCard";
import EventSlides from "../../components/participant/EventSlides";
import { AuthContext } from "../../context/AuthContext";
import EventSearchResult from "../../components/participant/EventSearchResult";

function ParticipantEventSearch() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
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
                {/* <IonRow>
                  <EventSlides />
                </IonRow> */}
                <IonRow>
                  <IonTitle color={"dark"}>
                    <h1>Result for "{query}"</h1>
                  </IonTitle>
                </IonRow>
                <IonRow style={{ marginLeft: "40px", marginRight: "40px" }}>
                  <EventSearchResult />
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
}

export default ParticipantEventSearch;

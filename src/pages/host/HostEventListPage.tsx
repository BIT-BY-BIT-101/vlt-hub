import { IonPage, IonContent, IonGrid, IonRow } from "@ionic/react";
import { UnpubEventCard } from "../../components/host/UnpubEventCard";
import Header from "../../components/header/Header";
import Menus from "../../components/menus/Menus";
import SidePanel from "../../components/SidePanel";

const HostEventListPage = () => {
  return (
    <>
      {/* <HostNavMenu /> */}
      <Menus />
      <IonPage id="main">
        <Header />
        {/* <IonHeader>
          <IonToolbar>
            <IonMenuButton autoHide={false} slot="start" />
            <IonTitle>List of Events</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <IonContent>
          {/* <div className="hhome-form-container">
            <CreateEvent />
          </div> */}
          <IonGrid>
            <IonRow>
              <SidePanel />
              <UnpubEventCard />
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostEventListPage;

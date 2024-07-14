import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import HostNavMenu from "../../components/menus/HostNavMenu";
import "./HostCreatePage.css";
import CreateEvent from "../../components/host/CreateEvent";
import { useHistory } from "react-router-dom";
import Header from "../../components/header/Header";
import SidePanel from "../../components/SidePanel";

const HostCreatePage = () => {
  const history = useHistory();
  return (
    <>
      {/* <HostNavMenu /> */}
      <IonPage>
        <Header />
        {/* <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={history.goBack}>Back</IonButton>
            </IonButtons>
            <IonTitle>Create</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <IonContent id="main">
          <IonGrid>
            <IonRow>
              <SidePanel />
              <IonCol>
                <CreateEvent />
              </IonCol>
            </IonRow>
          </IonGrid>
          {/* <div className="hhome-form-container"></div> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostCreatePage;

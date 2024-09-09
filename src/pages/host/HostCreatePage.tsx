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
import Menus from "../../components/menus/Menus";

const HostCreatePage = () => {
  const history = useHistory();
  return (
    <>
      {/* <HostNavMenu /> */}
      <Menus />
      <IonPage id="main">
        <Header />

        <IonContent>
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

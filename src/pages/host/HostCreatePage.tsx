import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import HostNavMenu from "../../components/menus/HostNavMenu";
import "./HostCreatePage.css";
import CreateEvent from "../../components/host/CreateEvent";
import { useHistory } from "react-router-dom";

const HostCreatePage = () => {
  const history = useHistory();
  return (
    <>
      {/* <HostNavMenu /> */}
      <IonPage>
        <IonHeader>
          <IonToolbar>
            {/* <IonMenuButton autoHide={false} slot="start" /> */}
            <IonButtons slot="start">
              <IonButton onClick={history.goBack}>Back</IonButton>
            </IonButtons>
            <IonTitle>Create</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="main">
          <div className="hhome-form-container">
            <CreateEvent />
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostCreatePage;

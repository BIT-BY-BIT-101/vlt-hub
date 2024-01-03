import {
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import HostNavMenu from "../../components/menus/HostNavMenu";
import "./HostCreatePage.css";
import CreateEvent from "../../components/forms/CreateEvent";

const HostCreatePage = () => {
  return (
    <>
      <HostNavMenu />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonMenuButton autoHide={false} slot="start" />
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

import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import React, { useContext } from "react";
import Header from "../../components/header/Header";
import CreateEvent from "../../components/host/CreateEvent";
import Menus from "../../components/menus/Menus";
import EditEvent from "../../components/host/EditEvent";
import { AuthContext } from "../../context/AuthContext";
import Unauthorized from "../error_pages/Unauthorized";

const HostEditEventPage = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser?.data.isVerified !== true) {
    return <Unauthorized />;
  }

  return (
    <>
      {/* <HostNavMenu /> */}
      <Menus />
      <IonPage id="main">
        <Header />

        <IonContent>
          <IonGrid>
            <IonRow>
              {/* <SidePanel /> */}
              <IonCol>
                <EditEvent />
              </IonCol>
            </IonRow>
          </IonGrid>
          {/* <div className="hhome-form-container"></div> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostEditEventPage;

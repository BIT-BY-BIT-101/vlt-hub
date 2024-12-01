import React from "react";
import KYCForm from "../../components/host/KYCForm";
import { IonPage, IonContent, IonRow } from "@ionic/react";

const HostVerificationFormPage = () => {
  return (
    <IonPage>
      <IonContent>
        <IonRow>
          <KYCForm />
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default HostVerificationFormPage;

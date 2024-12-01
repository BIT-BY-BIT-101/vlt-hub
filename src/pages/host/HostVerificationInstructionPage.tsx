import React from "react";
import VerifyHost from "../../components/host/KYCInstruction";
import { IonContent, IonPage, IonRow } from "@ionic/react";

const HostVerificationInstructionPage = () => {
  return (
    <IonPage>
      <IonContent>
        <IonRow>
          <VerifyHost />
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default HostVerificationInstructionPage;

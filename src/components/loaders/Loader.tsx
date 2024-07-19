import React from "react";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { bouncy } from "ldrs";
bouncy.register(); // Default values shown

const Loader = () => {
  return (
    // Default values shown

    <IonContent>
      <IonGrid>
        <IonRow className="ion-justify-content-center ion-align-items-center h-full">
          <div className="ion-align-self-center">
            <l-bouncy size="150" speed="1.75" color="black "></l-bouncy>
          </div>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default Loader;

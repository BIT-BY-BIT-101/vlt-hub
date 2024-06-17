import { IonCol, IonItem, IonLabel } from "@ionic/react";
import { IonicReactProps } from "@ionic/react/dist/types/components/IonicReactProps";
import React from "react";
type Props = {} & IonicReactProps;
const ParticipantSidePane: React.FC<Props> = () => {
  return (
    <IonCol size="2" className="side-pane">
      <div>
        <IonItem className="item-color " routerLink="/participant">
          <IonLabel>Home</IonLabel>
        </IonItem>
        <IonItem className="item-color" routerLink="/participant/profile">
          <IonLabel>Account</IonLabel>
        </IonItem>
        <IonItem className="item-color" routerLink="/participant/history">
          <IonLabel>History</IonLabel>
        </IonItem>
      </div>
    </IonCol>
  );
};

export default ParticipantSidePane;

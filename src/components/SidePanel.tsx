import { IonCol, IonItem, IonLabel } from "@ionic/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SidePanel = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser?.data.role === "participant") {
    return (
      <IonCol size="2" className="side-pane">
        <div>
          <IonItem className="item-color " routerLink="/participant">
            <IonLabel>Home</IonLabel>
          </IonItem>
          <IonItem className="item-color" routerLink="/participant/profile">
            <IonLabel>Account</IonLabel>
          </IonItem>
          <IonItem className="item-color" routerLink="/participant/events">
            <IonLabel>My Events</IonLabel>
          </IonItem>
          <IonItem className="item-color" routerLink="/participant/history">
            <IonLabel>History</IonLabel>
          </IonItem>
        </div>
      </IonCol>
    );
  }

  if (currentUser?.data.role === "host") {
    return (
      <IonCol size="2" className="side-pane">
        <div>
          <IonItem className="item-color " routerLink="/host">
            <IonLabel>Home</IonLabel>
          </IonItem>
          <IonItem className="item-color " routerLink="/host/event-list">
            <IonLabel>Create</IonLabel>
          </IonItem>
          <IonItem className="item-color" routerLink="/host/profile">
            <IonLabel>Account</IonLabel>
          </IonItem>
        {/*  <IonItem className="item-color" routerLink="/host/history">
            <IonLabel>History</IonLabel>
          </IonItem>*/}
        </div>
      </IonCol>
    );
  }

  if (currentUser?.data.role === "venue") {
    return (
      <IonCol size="2" className="side-pane">
        <div>
          <IonItem className="item-color " routerLink="/venue">
            <IonLabel>Home</IonLabel>
          </IonItem>
          <IonItem className="item-color" routerLink="/venue/profile">
            <IonLabel>Account</IonLabel>
          </IonItem>
          <IonItem className="item-color " routerLink="/venue/list-venue">
            <IonLabel>Facilities</IonLabel>
          </IonItem>
          <IonItem className="item-color" routerLink="/venue/requests">
            <IonLabel>Requests</IonLabel>
          </IonItem>
          <IonItem className="item-color" routerLink="/venue/transactions">
            <IonLabel>Transactions</IonLabel>
          </IonItem>
          <IonItem className="item-color" routerLink="/venue/booked-events">
            <IonLabel>Booked Events</IonLabel>
          </IonItem>
          {/* <IonItem className="item-color" routerLink="/venue/history">
            <IonLabel>History</IonLabel>
          </IonItem> */}
        </div>
      </IonCol>
    );
  }

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

export default SidePanel;

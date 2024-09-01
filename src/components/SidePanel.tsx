import { IonCol, IonItem, IonLabel } from "@ionic/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { isMenuItemActive } from "../helpers/Helpers";

const SidePanel = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser?.data.role === "participant") {
    return (
      <IonCol size="2" className="side-pane">
        <div>
          <IonItem className={`item-bg-none ${isMenuItemActive("/participant/home")? "activated": ""}`} routerLink="/participant">
            <IonLabel>Home</IonLabel>
          </IonItem>
          <IonItem className={`item-bg-none ${isMenuItemActive("/participant/profile")? "activated": ""}`} routerLink="/participant/profile">
            <IonLabel>Account</IonLabel>
          </IonItem>
          <IonItem className={`item-bg-none ${isMenuItemActive("/participant/events")? "activated": ""}`} routerLink="/participant/events">
            <IonLabel>My Events</IonLabel>
          </IonItem>
          <IonItem className={`item-bg-none ${isMenuItemActive("/participant/history")? "activated": ""}`} routerLink="/participant/history">
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
          {/* <IonItem className="item-color " routerLink="/host">
            <IonLabel>Home</IonLabel>
          </IonItem> */}
          <IonItem className={`item-bg-none ${isMenuItemActive("/host/event-list")? "activated":""}`} routerLink="/host/event-list">
            <IonLabel>Create</IonLabel>
          </IonItem>
          <IonItem className={`item-bg-none ${isMenuItemActive("/host/profile")? "activated":""}`} routerLink="/host/profile">
            <IonLabel>Account</IonLabel>
          </IonItem>
          <IonItem className={`item-bg-none ${isMenuItemActive("/host/event")? "activated":""}`} routerLink="/host/event">
            <IonLabel>Events</IonLabel>
          </IonItem>
          {/* <IonItem className={`item-bg-none ${isMenuItemActive()}`} routerLink="/host/history">
            <IonLabel>History</IonLabel>
          </IonItem> */}
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
          <IonItem className={`item-bg-none ${isMenuItemActive("/venue/profile")? "activated":""}`} routerLink="/venue/profile">
            <IonLabel>Account</IonLabel>
          </IonItem>
          <IonItem className={`item-bg-none ${isMenuItemActive("/venue/list-venue")? "activated": ""}`} routerLink="/venue/list-venue">
            <IonLabel>Facilities</IonLabel>
          </IonItem>
          <IonItem className={`item-bg-none ${isMenuItemActive("/venue/requests")? "activated":""}`} routerLink="/venue/requests">
            <IonLabel>Requests</IonLabel>
          </IonItem>
          <IonItem className={`item-bg-none ${isMenuItemActive("/venue/transactions")? "activated":""}`} routerLink="/venue/transactions">
            <IonLabel>Transactions</IonLabel>
          </IonItem>
          <IonItem className={`item-bg-none ${isMenuItemActive("/venue/booked-events")? "activated":""}`} routerLink="/venue/booked-events">
            <IonLabel>Booked Events</IonLabel>
          </IonItem>
          {/* <IonItem className={`item-bg-none ${isMenuItemActive()}`} routerLink="/venue/history">
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
        <IonItem className={`item-bg-none ${isMenuItemActive("/participant/profile")? "activated":""}`} routerLink="/participant/profile">
          <IonLabel>Account</IonLabel>
        </IonItem>
        <IonItem className={`item-bg-none ${isMenuItemActive("/participant/history")? "activated":""}`} routerLink="/participant/history">
          <IonLabel>History</IonLabel>
        </IonItem>
      </div>
    </IonCol>
  );
};

export default SidePanel;

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
          <IonItem
            className={`${
              isMenuItemActive("/participant/home")
                ? "activated"
                : "item-bg-none"
            }`}
            routerLink="/participant"
          >
            <IonLabel>Home</IonLabel>
          </IonItem>
          <IonItem
            className={`${
              isMenuItemActive("/participant/profile")
                ? "activated"
                : "item-bg-none"
            }`}
            routerLink="/participant/profile"
          >
            <IonLabel>Account</IonLabel>
          </IonItem>
          <IonItem
            className={`${
              isMenuItemActive("/participant/events")
                ? "activated"
                : "item-bg-none"
            }`}
            routerLink="/participant/events"
          >
            <IonLabel>My Events</IonLabel>
          </IonItem>
          <IonItem
            className={`${
              isMenuItemActive("/participant/history")
                ? "activated"
                : "item-bg-none"
            }`}
            routerLink="/participant/history"
          >
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
          <IonItem
            className={`${
              isMenuItemActive("/host/event-list")
                ? "activated"
                : "item-bg-none"
            }`}
            routerLink="/host/event-list"
          >
            <IonLabel>Create</IonLabel>
          </IonItem>
          <IonItem
            className={`${
              isMenuItemActive("/host/profile") ? "activated" : "item-bg-none"
            }`}
            routerLink="/host/profile"
          >
            <IonLabel>Account</IonLabel>
          </IonItem>
          <IonItem
            className={` ${
              isMenuItemActive("/host/event") ? "activated" : "item-bg-none"
            }`}
            routerLink="/host/event"
          >
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
          <IonItem
            className={`${
              isMenuItemActive("/venue/home") ? "activated" : "item-bg-none"
            }`}
            routerLink="/venue/home"
          >
            <IonLabel>Home</IonLabel>
          </IonItem>
          <IonItem
            className={`${
              isMenuItemActive("/venue/profile") ? "activated" : "item-bg-none"
            }`}
            routerLink="/venue/profile"
          >
            <IonLabel>Account</IonLabel>
          </IonItem>
          <IonItem
            className={`${
              isMenuItemActive("/venue/list-venue")
                ? "activated"
                : "item-bg-none"
            }`}
            routerLink="/venue/list-venue"
          >
            <IonLabel>Facilities</IonLabel>
          </IonItem>
          <IonItem
            className={`${
              isMenuItemActive("/venue/requests") ? "activated" : "item-bg-none"
            }`}
            routerLink="/venue/requests"
          >
            <IonLabel>Requests</IonLabel>
          </IonItem>
          <IonItem
            className={`${
              isMenuItemActive("/venue/transactions")
                ? "activated"
                : "item-bg-none"
            }`}
            routerLink="/venue/transactions"
          >
            <IonLabel>Transactions</IonLabel>
          </IonItem>
          <IonItem
            className={`${
              isMenuItemActive("/venue/booked-events")
                ? "activated"
                : "item-bg-none"
            }`}
            routerLink="/venue/booked-events"
          >
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
        <IonItem
          className={`item-bg-none ${
            isMenuItemActive("/participant/profile") ? "activated" : ""
          }`}
          routerLink="/participant/profile"
        >
          <IonLabel>Account</IonLabel>
        </IonItem>
        <IonItem
          className={`item-bg-none ${
            isMenuItemActive("/participant/history") ? "activated" : ""
          }`}
          routerLink="/participant/history"
        >
          <IonLabel>History</IonLabel>
        </IonItem>
      </div>
    </IonCol>
  );
};

export default SidePanel;

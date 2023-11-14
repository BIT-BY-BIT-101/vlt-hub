import React from "react";
import { IonReactRouter } from "@ionic/react-router";

export const RouteService = () => {
  return {
    path: "/",
    render: (props) => <IonApp>{props.children}</IonApp>,
  };
};

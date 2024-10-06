import React from "react";
import { createRoot } from "react-dom/client";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import App from "./App";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { UpdateDataProvider } from "./context/UpdateDataContext";

defineCustomElements(window);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    {/* <UpdateDataProvider> */}
    <App />
    {/* </UpdateDataProvider> */}
  </AuthContextProvider>
  // </React.StrictMode>
);

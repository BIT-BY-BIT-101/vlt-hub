import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { notificationsOutline, search } from "ionicons/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./HomePage.css";
import Header from "../components/header/Header";
import Menus from "../components/menus/Menus";
import HomeComponent from "../components/ui/HomeComponent";

const HomePage: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event: CustomEvent) => {
    setSearchText(event.detail.value);
  };

  return (
    <>
      <Menus />

      <IonPage id="main">
        <Header />
        <IonContent color={"primary"}>
          <IonGrid>
            <IonRow className="ion-justify-content-center h-full w-full">
              <HomeComponent />
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HomePage;

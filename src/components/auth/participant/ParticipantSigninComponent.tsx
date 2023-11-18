import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonInput,
  IonItem,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignInSVG from "../../../assets/signin.svg";
import "./ParticipantSigninComponent.css";

const ParticipantSigninComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleLogin = () => {
    
  };

  return (
    <IonCard className="psignin-card">
      <IonCardHeader>
        <IonCardTitle className="psignin-heading">Let's sign you in.</IonCardTitle>
        <IonCardSubtitle className="psignin-subheading">
          Welcome back.<br/>
          You've been missed!
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonInput
          className="psignin-input"
          type="email"
          placeholder="Email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
        ></IonInput>

        <IonInput
          className="psignin-input"
          type="password"
          placeholder="Password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        ></IonInput>

        <IonItem>
          <IonText className="psignin-prompt">
            <p>
              Don't have an Account? <Link to={"/signup"}>Sign up!</Link>
            </p>
          </IonText>
        </IonItem>

        <IonButton expand="full" onClick={handleLogin} className="psignin-loginbtn">
          Log In
        </IonButton>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Authentication Error"
          message="An Error Occurred"
          buttons={["Close"]}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default ParticipantSigninComponent;

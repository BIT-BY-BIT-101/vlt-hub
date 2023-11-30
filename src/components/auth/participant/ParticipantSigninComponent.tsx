import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonText,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import SignInSVG from "../../../assets/psignin.svg";
import "./ParticipantSigninComponent.css";
import useFirebaseAuth from "../../../hooks/useFirebaseAuth";

const ParticipantSigninComponent: React.FC = () => {
  const { user, signIn } = useFirebaseAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignin = async () => {
    try {
      await signIn(email, password);
      console.log("Your Signin Successfully with an email", user);
    } catch (error) {}
    console.log("An Error Occured");
  };

  return (
    <div className="psignin-container">
      <div className="left-section">
        <img src={SignInSVG} alt="SignInSVG" className="psignin-img" />
      </div>

      <div className="right-section">
        <IonCard className="psignin-card">
          <IonCardHeader>
            <div className="logo-container">
              <img src={Logo} alt="V.L.T. Hub" className="psignin-logo" />
            </div>
            <IonCardTitle className="psignin-heading">
              Let's sign you in.
            </IonCardTitle>
            <IonCardSubtitle className="psignin-subheading1">
              Welcome back.
            </IonCardSubtitle>
            <IonCardSubtitle className="psignin-subheading2">
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            ></IonInput>
            <IonIcon
              className="psignin-eye-icon"
              slot="end"
              icon={showPassword ? eyeOff : eye}
              onClick={handleTogglePassword}
            />

            <IonItem>
              <IonText className="psignin-prompt">
                <p>
                  Don't have an Account?{" "}
                  <Link to={"/participant/signup"}>Sign up!</Link>
                </p>
              </IonText>
            </IonItem>

            <IonButton
              expand="full"
              onClick={handleSignin}
              className="psignin-loginbtn"
            >
              Sign in as a Participant
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
      </div>
    </div>
  );
};

export default ParticipantSigninComponent;

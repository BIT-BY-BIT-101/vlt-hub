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
import SignInSVG from "../../../assets/vsignin.svg";
import "./VenueSigninComponent.css";

const VenueSigninComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = () => {};

  return (
    <div className="vsignin-container">
      <div className="left-section">
        <img src={SignInSVG} alt="SignInSVG" className="vsignin-img" />
      </div>

      <div className="right-section">
        <IonCard className="vsignin-card">
          <IonCardHeader>
            <div className="logo-container">
              <img src={Logo} alt="V.L.T. Hub" className="vsignin-logo" />
            </div>
            <IonCardTitle className="vsignin-heading">
              Let's sign you in.
            </IonCardTitle>
            <IonCardSubtitle className="vsignin-subheading1">
              Welcome back.
            </IonCardSubtitle>
            <IonCardSubtitle className="vsignin-subheading2">
              Ready to manage venues?
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonInput
              className="vsignin-input"
              type="email"
              placeholder="Email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            ></IonInput>

            <IonInput
              className="vsignin-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            ></IonInput>
            <IonIcon
              className="vsignin-eye-icon"
              slot="end"
              icon={showPassword ? eyeOff : eye}
              onClick={handleTogglePassword}
            />

            <IonItem>
              <IonText className="vsignin-prompt">
                <p>
                  Don't have an Account?{" "}
                  <Link to={"/venue/signup"}>Sign up!</Link>
                </p>
              </IonText>
            </IonItem>

            <IonButton
              expand="full"
              onClick={handleLogin}
              className="vsignin-loginbtn"
            >
              Sign in as a Venue
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

export default VenueSigninComponent;

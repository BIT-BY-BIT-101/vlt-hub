import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignUpSVG from "../../../assets/hsignup.svg";
import Logo from "../../../assets/logo.png";
import "./HostSignupComponent.css";

const handleSignup = () => {};

const HostSignupComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="hsignup-container">
      <div className="left-section">
        <img src={SignUpSVG} alt="SignUpSVG" className="psignup-img" />
      </div>

      <div className="right-section">
        <IonCard className="hsignup-card">
          <div className="logo-container">
            <img src={Logo} alt="V.L.T. Hub" className="psignup-logo" />
          </div>
          <IonCardHeader>
            <IonCardTitle className="hsignup-heading">
              Building Bridges for Brighter Minds.
            </IonCardTitle>
            <IonCardSubtitle className="hsignup-subheading">
              Host your seminar with VLT Hub.
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <div className="hsignup-flname">
              <IonInput
                className="hsignup-input"
                type="text"
                placeholder="First Name"
              ></IonInput>

              <IonInput
                className="hsignup-input"
                type="text"
                placeholder="Last Name"
              ></IonInput>
            </div>

            <IonInput
              className="hsignup-input"
              type="email"
              placeholder="Enter your email address"
            ></IonInput>

            <IonInput
              className="hsignup-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter a password"
            />

            <IonIcon
              className="hsignup-eye-icon"
              slot="end"
              icon={showPassword ? eyeOff : eye}
              onClick={handleTogglePassword}
            />

            <div className="hsignup-birthdate">
              <IonInput
                className="hsignup-input hsignup-birthdate-input"
                type="number"
                inputmode="numeric"
                placeholder="MM"
              />
              <IonInput
                className="hsignup-input hsignup-birthdate-input"
                type="number"
                inputmode="numeric"
                placeholder="DD"
              />
              <IonInput
                className="hsignup-input hsignup-birthdate-input"
                type="number"
                inputmode="numeric"
                placeholder="YYYY"
              />
            </div>

            <IonItem>
              <IonText className="hsignup-prompt">
                <p>
                  Already have an Account?{" "}
                  <Link to={"/host/signin"}>Sign in</Link>
                </p>
              </IonText>
            </IonItem>

            <IonButton
              expand="full"
              onClick={handleSignup}
              className="hsignup-signupbtn"
            >
              Sign up as a Host
            </IonButton>
          </IonCardContent>
        </IonCard>
      </div>
    </div>
  );
};

export default HostSignupComponent;

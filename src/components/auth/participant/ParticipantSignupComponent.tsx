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
import Logo from "../../../assets/logo.png";
import SignUpSVG from "../../../assets/signup.svg";
import "./ParticipantSignupComponent.css";

const handleSignup = () => {};

const ParticipantSignupComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="psignup-container">
      <div className="left-section">
        <img src={SignUpSVG} alt="SignUpSVG" className="psignup-img" />
      </div>

      <div className="right-section">
        <IonCard className="psignup-card">
          <div className="logo-container">
            <img src={Logo} alt="V.L.T. Hub" className="psignup-logo" />
          </div>
          <IonCardHeader>
            <IonCardTitle className="psignup-heading">
              Building Bridges for Brighter Minds.
            </IonCardTitle>
            <IonCardSubtitle className="psignup-subheading">
              Join V.L.T. Hub now.
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <div className="psignup-group">
              <IonInput
                className="psignup-input"
                type="text"
                placeholder="First Name"
              ></IonInput>

              <IonInput
                className="psignup-input"
                type="text"
                placeholder="Last Name"
              ></IonInput>
            </div>
            <IonInput
              className="psignup-input"
              type="email"
              placeholder="Enter your email address"
            ></IonInput>

            <IonInput
              className="psignup-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter a password"
            >
              <IonIcon
                className="psignup-eye-icon"
                slot="end"
                icon={showPassword ? eyeOff : eye}
                onClick={handleTogglePassword}
              />
            </IonInput>

            <IonItem>
              <IonText className="psignup-prompt">
                <p>
                  Already have an Account? <Link to={"/signin"}>Sign in!</Link>
                </p>
              </IonText>
            </IonItem>

            <IonButton
              expand="full"
              onClick={handleSignup}
              className="psignup-signupbtn"
            >
              Sign up as a Participant
            </IonButton>
          </IonCardContent>
        </IonCard>
      </div>
    </div>
  );
};

export default ParticipantSignupComponent;

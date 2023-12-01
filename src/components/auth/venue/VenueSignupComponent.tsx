import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonDatetime,
  IonDatetimeButton,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonText,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import SignUpSVG from "../../../assets/vsignup.svg";
import "./VenueSignupComponent.css";

const handleSignup = () => {};

const VenueSignupComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="vsignup-container">
      <div className="left-section">
        <img src={SignUpSVG} alt="SignUpSVG" className="vsignup-img" />
      </div>

      <div className="right-section">
        <IonCard className="vsignup-card">
          <div className="logo-container">
            <img src={Logo} alt="V.L.T. Hub" className="vsignup-logo" />
          </div>
          <IonCardHeader>
            <IonCardTitle className="vsignup-heading">
              Building Bridges for Brighter Minds.
            </IonCardTitle>
            <IonCardSubtitle className="vsignup-subheading">
              Unlock Venue Opportunities.
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <div className="vsignup-flname">
              <IonInput
                className="vsignup-input"
                type="text"
                placeholder="First Name"
              ></IonInput>

              <IonInput
                className="vsignup-input"
                type="text"
                placeholder="Last Name"
              ></IonInput>
            </div>

            <IonInput
              className="vsignup-input"
              type="email"
              placeholder="Enter your email address"
            ></IonInput>

            <IonInput
              className="vsignup-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter a password"
            />

            <IonIcon
              className="vsignup-eye-icon"
              slot="end"
              icon={showPassword ? eyeOff : eye}
              onClick={handleTogglePassword}
            />

            <div className="vsignup-birthdate">
              <IonGrid>
                <IonRow className="vsignup-birthdate-container">
                  <IonCol>
                    <IonLabel className="vsignup-birthdate-label">
                      Date of Birth:
                    </IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonDatetimeButton
                      datetime="date"
                      className="vsignup-birthdate-button"
                    ></IonDatetimeButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
              <IonModal keepContentsMounted={true}>
                <IonDatetime presentation="date" id="date"></IonDatetime>
              </IonModal>
            </div>

            <IonItem>
              <IonText className="vsignup-prompt">
                <p>
                  Already have an Account?{" "}
                  <Link to={"/venue/signin"}>Sign in</Link>
                </p>
              </IonText>
            </IonItem>

            <IonButton
              expand="full"
              onClick={handleSignup}
              className="vsignup-signupbtn"
            >
              Sign up as a Venue
            </IonButton>
          </IonCardContent>
        </IonCard>
      </div>
    </div>
  );
};

export default VenueSignupComponent;

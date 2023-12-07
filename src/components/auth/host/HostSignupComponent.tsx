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
import SignUpSVG from "../../../assets/hsignup.svg";
import Logo from "../../../assets/logo.png";
import "./HostSignupComponent.css";
import useFirebaseAuth from "../../../hooks/useFirebaseAuth";

const HostSignupComponent = () => {
  const { signUp } = useFirebaseAuth();
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newFirstname, setNewFirstname] = useState<string>("");
  const [newLastnaem, setNewLastname] = useState<string>("");
  const [newBirthdate, setNewBirthdate] = useState<string>("");

  // const [month, setMonth] = useState("");
  // const [date, setDate] = useState("");
  // const [year, setYear] = useState("");

  const handleSignup = async () => {
    // const formattedBirthdate = `${month}/${date}/${year}`;
    // await setNewBirthdate(formattedBirthdate);
    try {
      await signUp(
        newEmail,
        newPassword,
        newFirstname,
        newLastnaem,
        newBirthdate,
        "participant"
      );
      // Redirect or handle success as needed
      console.log("Account created successfully");
    } catch (err) {
      console.error("Signup error:", err);
      // Handle error, show message, etc.
    }
  };
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
                onIonChange={(e) => setNewFirstname(e.detail.value!)}
              ></IonInput>

              <IonInput
                className="hsignup-input"
                type="text"
                placeholder="Last Name"
                onIonChange={(e) => setNewLastname(e.detail.value!)}
              ></IonInput>
            </div>

            <IonInput
              className="hsignup-input"
              type="email"
              placeholder="Enter your email address"
              onIonChange={(e) => setNewEmail(e.detail.value!)}
            ></IonInput>

            <IonInput
              className="hsignup-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter a password"
              onIonChange={(e) => setNewPassword(e.detail.value!)}
            />

            <IonIcon
              className="hsignup-eye-icon"
              slot="end"
              icon={showPassword ? eyeOff : eye}
              onClick={handleTogglePassword}
            />

            <div className="hsignup-birthdate">
              <IonGrid>
                <IonRow className="hsignup-birthdate-container">
                  <IonCol>
                    <IonLabel className="hsignup-birthdate-label">
                      Date of Birth:
                    </IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonDatetimeButton
                      datetime="date"
                      className="hsignup-birthdate-button"
                    ></IonDatetimeButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  presentation="date"
                  id="date"
                  onIonChange={(e) => {
                    // const selectedDate = new Date().toString();
                    setNewBirthdate(e.detail.value!.toString());
                    console.log(e.detail.value!.toString());
                  }}
                  min="1950"
                ></IonDatetime>
              </IonModal>
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

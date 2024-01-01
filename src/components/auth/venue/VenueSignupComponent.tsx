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
import { Link, Redirect } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import SignUpSVG from "../../../assets/vsignup.svg";
import "./VenueSignupComponent.css";
import useFirebaseAuth from "../../../hooks/useFirebaseAuth";

const VenueSignupComponent = () => {
  const { user, signUp } = useFirebaseAuth();
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
        "venue"
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

  if (user) {
    return <Redirect to="/venue/home" />;
  }

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
                onIonChange={(e) => setNewFirstname(e.detail.value!)}
              ></IonInput>

              <IonInput
                className="vsignup-input"
                type="text"
                placeholder="Last Name"
                onIonChange={(e) => setNewLastname(e.detail.value!)}
              ></IonInput>
            </div>

            <IonInput
              className="vsignup-input"
              type="email"
              placeholder="Enter your email address"
              onIonChange={(e) => setNewEmail(e.detail.value!)}
            ></IonInput>

            <IonInput
              className="vsignup-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter a password"
              onIonChange={(e) => setNewPassword(e.detail.value!)}
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
                <IonDatetime
                  presentation="date"
                  id="date"
                  showDefaultButtons={true}
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

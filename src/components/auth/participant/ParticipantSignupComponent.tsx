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
  IonLoading,
  IonModal,
  IonRow,
  IonText,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import SignUpSVG from "../../../assets/psignup.svg";
import useFirebaseAuth from "../../../hooks/useFirebaseAuth";
import "./ParticipantSignupComponent.css";
import { AuthContext } from "../../../context/AuthContext";
import { serverTimestamp } from "firebase/firestore";
import {
  getMinimumDate,
  getMaximumDate,
} from "../../../helpers/DateTimeFunctions";

const ParticipantSignupComponent = () => {
  const { currentUser } = useContext(AuthContext);

  const { user, signUp } = useFirebaseAuth();
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newFirstname, setNewFirstname] = useState<string>("");
  const [newLastnaem, setNewLastname] = useState<string>("");
  const [newBirthdate, setNewBirthdate] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");

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

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  if (currentUser?.data.role === "participant") {
    return <Redirect to="/participant/home" />;
  }

  const minDate = getMinimumDate();
  const maxDate = getMaximumDate();

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
            <div className="psignup-flname">
              <IonInput
                className="auth-input"
                type="text"
                placeholder="First Name"
                onIonChange={(e) => setNewFirstname(e.detail.value!)}
              ></IonInput>

              <IonInput
                className="auth-input"
                type="text"
                placeholder="Last Name"
                onIonChange={(e) => setNewLastname(e.detail.value!)}
              ></IonInput>
            </div>

            <IonInput
              className="auth-input"
              type="email"
              placeholder="Enter your email address"
              onIonChange={(e) => setNewEmail(e.detail.value!)}
            ></IonInput>

            <IonInput
              className="auth-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter a password"
              onIonChange={(e) => setNewPassword(e.detail.value!)}
            >
              <IonButton fill="clear" slot="end" onClick={handleTogglePassword}>
                <IonIcon
                  // className="psignup-eye-icon"
                  slot="icon-only"
                  icon={showPassword ? eyeOff : eye}
                />
              </IonButton>
            </IonInput>

            <div className="psignup-birthdate">
              <IonGrid>
                <IonRow className="psignup-birthdate-container">
                  <IonCol>
                    <IonLabel className="psignup-birthdate-label">
                      Date of Birth:
                    </IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonDatetimeButton
                      datetime="date"
                      className="psignup-birthdate-button"
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
                  value={maxDate}
                  min={minDate}
                  max={maxDate}
                ></IonDatetime>
              </IonModal>
            </div>

            <IonItem>
              <IonText className="psignup-prompt">
                <p>
                  Already have an Account?{" "}
                  <Link to={"/participant/signin"}>Sign in</Link>
                </p>
              </IonText>
            </IonItem>

            <IonButton
              expand="full"
              onClick={handleSignup}
              // className="psignup-signupbtn"
              color={"primary"}
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

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
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import SignUpSVG from "../../../assets/hsignup.svg";
import Logo from "../../../assets/logo.png";
import "./HostSignupComponent.css";
import useFirebaseAuth from "../../../hooks/useFirebaseAuth";
import { AuthContext } from "../../../context/AuthContext";
import {
  getMaximumDate,
  getMinimumDate,
} from "../../../helpers/DateTimeFunctions";
import nodeMailApi from "../../../config/nodemail";
import { render } from "@react-email/render";

import WelcomeEmail from "../../../emails/WelcomeEmail";

const HostSignupComponent = () => {
  const { currentUser } = useContext(AuthContext);
  const { user, signUp } = useFirebaseAuth();
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newFirstname, setNewFirstname] = useState<string>("");
  const [newLastnaem, setNewLastname] = useState<string>("");
  const [newBirthdate, setNewBirthdate] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailMessage, setEmailMessage] = useState<string>();

  useEffect(() => {
    const appUrl = import.meta.env.VITE_APP_URL;
    async function getTemplate() {
      const emailTemplate = await render(
        <WelcomeEmail appUrl={appUrl} firestName={newFirstname} />,
        {
          pretty: true,
        }
      );
      setEmailMessage(emailTemplate);
    }
    getTemplate();
  }, [newFirstname]);

  const handleSignup = async () => {
    try {
      await signUp(
        newEmail,
        newPassword,
        newFirstname,
        newLastnaem,
        newBirthdate,
        "host"
      )
        .then(async () => {
          // const name = `${newFirstname} ${newLastnaem}`;

          const payload = {
            name: newFirstname,
            subject: "Welcome to V.L.T. Hub",
            email: newEmail,
            message: emailMessage,
          };

          await nodeMailApi.post("api/v1/send-email", payload);
        })
        .catch((err) => {
          console.error(err);
        });
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

  if (currentUser?.data.role === "host") {
    // return <Redirect to="/host/home" />;
    return <Redirect to="/host/event-list" />;
  }

  const minDate = getMinimumDate();
  const maxDate = getMaximumDate();

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
              <IonButton fill="clear" onClick={handleTogglePassword} slot="end">
                <IonIcon
                  // className="hsignup-eye-icon"
                  slot="icon-only"
                  icon={showPassword ? eyeOff : eye}
                />
              </IonButton>
            </IonInput>

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
                  showDefaultButtons={true}
                  onIonChange={(e) => {
                    // const selectedDate = new Date().toString();
                    setNewBirthdate(e.target.value!.toString());
                    console.log(e.detail.value!.toString());
                  }}
                  // value={maxDate}
                  min={minDate}
                  max={maxDate}
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
              // className="hsignup-signupbtn"
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

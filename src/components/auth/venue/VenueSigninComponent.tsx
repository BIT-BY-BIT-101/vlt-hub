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
  IonLoading,
  IonText,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import React, { useContext, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import SignInSVG from "../../../assets/vsignin.svg";
import "./VenueSigninComponent.css";
import useFirebaseAuth from "../../../hooks/useFirebaseAuth";
import { AuthContext } from "../../../context/AuthContext";

type errorProps = {
  message: string;
  code: string;
};

const VenueSigninComponent: React.FC = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const { user, signIn } = useFirebaseAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<errorProps>();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignin = async () => {
    try {
      await signIn(email, password);
      localStorage.setItem("session", email);
      console.log("Your Signin Successfully with an email", user?.email);
      window.location.href = "/venue/home";
    } catch (err: any) {
      console.log("message: ", err.message);
      console.log("code: ", err.code);
      const errObj: errorProps = {
        message: err.message,
        code: err.code,
      };
      setError(errObj);
      setShowAlert(true);
    }
  };
  const errorMessageMap: Record<string, string> = {
    "auth/invalid-credential": "Invalid credentials. Please try again.",
    "auth/invalid-email": "Invalid email. Please try again with a valid email.",

    "auth/wrong-password": "Wrong Password",
    "auth/too-many-requests":
      "Too Many Failed Login Attempt, Please try again later", // Add more error codes and corresponding messages as needed
  };

  if (currentUser && currentUser?.data.role === "venue") {
    // return <Redirect to="/venue/home" />;
    return <Redirect to="/venue/home" />;
  }

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
              onClick={handleSignin}
              className="vsignin-loginbtn"
            >
              Sign in as a Venue
            </IonButton>

            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              header="Authentication Error"
              message={errorMessageMap[error?.code] || "An Error Occured"}
              buttons={["Close"]}
            />
          </IonCardContent>
        </IonCard>
      </div>
    </div>
  );
};

export default VenueSigninComponent;

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
import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import SignInSVG from "../../../assets/hsignin.svg";
import Logo from "../../../assets/logo.png";
import "./HostSigninComponent.css";
import useFirebaseAuth from "../../../hooks/useFirebaseAuth";
import { AuthContext } from "../../../context/AuthContext";

type errorProps = {
  message: string;
  code: string;
};

const HostSigninComponent: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { user, signIn } = useFirebaseAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<errorProps>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignin = async () => {
    try {
      await signIn(email, password);
      localStorage.setItem("session", email);
      console.log("Your Signin Successfully with an email", user?.email);
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
  if (currentUser?.data.role === "host") {
    return <Redirect to="/host/home" />;
  }

  return (
    <div className="hsignin-container">
      <div className="left-section">
        <img src={SignInSVG} alt="SignInSVG" className="hsignin-img" />
      </div>

      <div className="right-section">
        <IonCard className="hsignin-card">
          <IonCardHeader>
            <div className="logo-container">
              <img src={Logo} alt="V.L.T. Hub" className="hsignin-logo" />
            </div>
            <IonCardTitle className="hsignin-heading">
              Let's sign you in.
            </IonCardTitle>
            <IonCardSubtitle className="hsignin-subheading1">
              Welcome back.
            </IonCardSubtitle>
            <IonCardSubtitle className="hsignin-subheading2">
              Ready to share your expertise?
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonInput
              className="hsignin-input"
              type="email"
              placeholder="Email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            ></IonInput>

            <IonInput
              className="hsignin-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            ></IonInput>
            <IonIcon
              className="hsignin-eye-icon"
              slot="end"
              icon={showPassword ? eyeOff : eye}
              onClick={handleTogglePassword}
            />

            <IonItem>
              <IonText className="hsignin-prompt">
                <p>
                  Don't have an Account?{" "}
                  <Link to={"/host/signup"}>Sign up!</Link>
                </p>
              </IonText>
            </IonItem>

            <IonButton
              expand="full"
              onClick={handleSignin}
              className="hsignin-loginbtn"
            >
              Sign in as a Host
            </IonButton>

            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              header="Authentication Error"
              message={errorMessageMap[error!?.code] || "An Error Occurred."}
              buttons={["Close"]}
            />
          </IonCardContent>
        </IonCard>
      </div>
    </div>
  );
};

export default HostSigninComponent;

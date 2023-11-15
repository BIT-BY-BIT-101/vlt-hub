import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
} from "@ionic/react";
import { Link } from "react-router-dom";

export default function ParticipantSigninComponent() {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Login</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonCardContent>
          <IonInput
            type="email"
            placeholder="Email"
            // value={email}
            // onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>

          <IonInput
            type="password"
            placeholder="Password"
            // value={password}
            // onIonChange={(e) => setPassword(e.detail.value!)}
          ></IonInput>

          <IonItem>
            <p>
              Don't have an Account? Please <Link to={"/signuo"}>Sign-Up</Link>
            </p>
          </IonItem>
          <IonButton>Log In</IonButton>

          {/* <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="Authentication Error"
            // subHeader="Important message"
            message="An Error Occured"
            buttons={["Close"]}
          /> */}
        </IonCardContent>
      </IonCardContent>
    </IonCard>
  );
}

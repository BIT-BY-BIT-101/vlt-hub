import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
// import { useAuth } from "../../context/AuthContext";

function AuthPage() {
  const { user, loading, error, signUp, signIn, signOut } = useFirebaseAuth();
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newRole, setNewRole] = useState<"host" | "participant" | "venue">(
    "participant"
  );

  // const handleSignup = () => {
  //   signUp(newEmail, newPassword, newRole);
  // };

  const handleSignup = async () => {
    try {
      await signUp(newEmail, newPassword);
      // Redirect or handle success as needed
      console.log("Account created successfully");
    } catch (err) {
      console.error("Signup error:", err);
      // Handle error, show message, etc.
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hello</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Signup</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>Firstname</IonLabel>
              <IonInput
                type="text"
                label="firstname"
                onIonChange={(e) => setNewEmail(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Lastname</IonLabel>
              <IonInput
                type="text"
                label="lastname"
                onIonChange={(e) => setNewEmail(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Birthdate</IonLabel>
              <IonInput
                type="date"
                label="lastname"
                onIonChange={(e) => setNewEmail(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Lastname</IonLabel>
              <IonInput
                type="text"
                label="lastname"
                onIonChange={(e) => setNewEmail(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Email</IonLabel>
              <IonInput
                type="email"
                label="email"
                onIonChange={(e) => setNewEmail(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Password</IonLabel>
              <IonInput
                type="password"
                label="password"
                onIonChange={(e) => setNewPassword(e.detail.value!)}
              />
            </IonItem>

            <IonRadioGroup
              value={newRole}
              onIonChange={(e) =>
                setNewRole(e.detail.value as "host" | "venue" | "participant")
              }
            >
              <IonItem>
                <IonLabel>Host</IonLabel>
                <IonRadio slot="end" value="host"></IonRadio>
              </IonItem>

              <IonItem>
                <IonLabel>Participant</IonLabel>
                <IonRadio slot="end" value="participant"></IonRadio>
              </IonItem>

              <IonItem>
                <IonLabel>Venue</IonLabel>
                <IonRadio slot="end" value="venue"></IonRadio>
              </IonItem>
              <IonItem>
                <IonButton onClick={handleSignup}>Signup</IonButton>
              </IonItem>
            </IonRadioGroup>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Signin</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonInput type="email" label="email" />
            </IonItem>
            <IonItem>
              <IonInput type="password" label="password" />
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

export default AuthPage;

import { IonButton, useIonAlert } from "@ionic/react";
import React from "react";

function SignUpAndSignInComponent() {
  const [presentAlert] = useIonAlert();

  return (
    <IonButton
      onClick={() =>
        presentAlert({
          header: "Please enter your info",
          buttons: ["OK"],
          inputs: [
            {
              placeholder: "Name",
            },
            {
              placeholder: "Nickname (max 8 characters)",
              attributes: {
                maxlength: 8,
              },
            },
            {
              type: "number",
              placeholder: "Age",
              min: 1,
              max: 100,
            },
            {
              type: "textarea",
              placeholder: "A little about yourself",
            },
          ],
        })
      }
    >
      Click Me
    </IonButton>
  );
}

export default SignUpAndSignInComponent;

import { IonButton } from "@ionic/react";
import React from "react";

type Props = React.HTMLAttributes<HTMLIonButtonElement> & {
  children?: React.ReactNode;
};

const SecondaryButton = ({ children, ...props }: Props) => {
  return (
    <IonButton className="btn-secondary" {...props}>
      {children}
    </IonButton>
  );
};

export default SecondaryButton;

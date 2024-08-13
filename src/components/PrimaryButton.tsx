import {
  IonButtons,
  IonButton,
  AnimationBuilder,
  RouterDirection,
  RouterOptions,
} from "@ionic/react";
import { IonicReactProps } from "@ionic/react/dist/types/components/IonicReactProps";
import React from "react";

type Props = React.HTMLAttributes<HTMLIonButtonElement> & {
  children?: React.ReactNode;
  routerLink?: string | undefined;
  routerDirection?: RouterDirection | undefined;
  routerOptions?: RouterOptions | undefined;
  routerAnimation?: AnimationBuilder | undefined;
};

const PrimaryButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <IonButton className="btn-primary" {...props}>
      {children}
    </IonButton>
  );
};

export default PrimaryButton;

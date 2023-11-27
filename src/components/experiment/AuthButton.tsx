import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { logInOutline, addCircleOutline } from "ionicons/icons";

const AuthButton: React.FC<{
  to: string;
  slots: string;
  defaultpath: string;
}> = ({ to, slots, defaultpath }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(to);
  };

  return (
    <IonButton onClick={handleClick} slot={slots}>
      <IonIcon
        slot="start"
        icon={to === defaultpath ? addCircleOutline : logInOutline}
      />
      {to === defaultpath ? "Sign Up" : "Sign In"};
    </IonButton>
  );
};

export default AuthButton;

import { IonModal, IonContent, IonButton } from "@ionic/react";
import React from "react";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { useHistory } from "react-router-dom";
type LogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const { signOut } = useFirebaseAuth();
  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Logout clicked");
      // history.push("/participant/signin");
      window.location.href = "/participant/home";
    } catch (error) {}
  };
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      className="phome-confirmation-modal-container"
    >
      <IonContent class="phome-confirmation-modal-content">
        <h2 className="phome-confirmation-modal-txt">
          Logout from V.L.T. Hub?
        </h2>
        <div className="phome-modal-btn-container">
          <IonButton className="pyes-btn" onClick={handleSignOut}>
            Yes
          </IonButton>
          <IonButton className="pno-btn" onClick={onClose}>
            No
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default LogoutModal;

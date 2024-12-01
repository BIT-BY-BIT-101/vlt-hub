import { IonButton, IonCard, IonCardContent, IonCardTitle } from "@ionic/react";
import useHandleKYCs from "../../hooks/useHandleKYCs";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useGetKYC from "../../hooks/useGetKYC";
import VerifyingCard from "../cards/VerifyingCard";

const KYCInstructions = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useGetKYC(currentUser?.data.kyc_session_id);
  const { handleCreateKYCSession } = useHandleKYCs();
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
    minHeight: "100vh",
  };

  return (
    <div style={styles}>
      {data?.data.isSubmitted ? (
        <VerifyingCard />
      ) : (
        <IonCard className="card" style={{ width: "80%", maxWidth: "600px" }}>
          <IonCardTitle
            className="card-title"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            Verify Your Host Account
          </IonCardTitle>
          <IonCardContent style={{ textAlign: "center" }}>
            <p>
              To complete your verification as a host, please prepare the
              following documents:
            </p>
            <ul style={{ textAlign: "left", margin: "20px 0" }}>
              <li>
                <strong>1 Primary ID</strong> (e.g., Passport, Driver's License)
              </li>
              <li>
                <strong>1 Secondary ID</strong> (e.g., Birth Certificate, Social
                Security Card)
              </li>
              <li>
                <strong>1 Supporting Document</strong> (e.g., company invoice,
                company registration certificate)
              </li>
            </ul>
            <p>Ensure your documents are clear and legible.</p>

            {currentUser?.data.kyc_session_id ? (
              <IonButton
                // routerLink="/host/kyc/verify"
                onClick={() => (window.location.href = "/host/kyc/verify")}
                color="primary"
                expand="block"
                style={{ marginTop: "20px" }}
              >
                {/* <IonIcon icon={cloudUploadOutline} slot="start" /> */}
                Proceed
              </IonButton>
            ) : (
              <IonButton
                // routerLink="/host/kyc/verify"
                onClick={handleCreateKYCSession}
                color="primary"
                expand="block"
                style={{ marginTop: "20px" }}
              >
                {/* <IonIcon icon={cloudUploadOutline} slot="start" /> */}
                Proceed
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>
      )}
    </div>
  );
};

export default KYCInstructions;

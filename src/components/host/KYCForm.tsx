import React, { useContext, useRef, useState } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";
import useGetKYC from "../../hooks/useGetKYC";
import { AuthContext } from "../../context/AuthContext";
import UploadKYCDocs from "../modals/UploadKYCDocs";
import useUploadKYCFiles from "../../hooks/useUploadKYCFiles";
import VerifyingCard from "../cards/VerifyingCard";
import { serverTimestamp } from "firebase/firestore";

const KYCForm: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useGetKYC(currentUser?.data.kyc_session_id!);
  const { updateDocument } = useUploadKYCFiles();
  const [imgUrl, setImgUrl] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [filename, setFilename] = useState<string | null>(null);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
    minHeight: "100vh",
    // flexDirection: "column",
  };

  const handleUpload = (type: string) => {
    // Function to handle file upload logic for each type
    console.log(`Uploading ${type} document`);
  };

  const handleOpenModal = (filename: string) => {
    setShowModal(true);
    setFilename(filename);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    updateDocument({
      date_submitted: serverTimestamp(),
      status: "verifying",
      isVerified: false,
      isSubmitted: true,
      is_transaction_complete: false,
    });

    window.location.href = "/host/event-list";
  };

  const isReadyToSubmit = () => {
    return (
      data?.data.primary_id_url &&
      data?.data.secondary_id_url &&
      data?.data.supporting_document_url
    );
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
            Upload Your Documents
          </IonCardTitle>
          <IonCardContent style={{ textAlign: "center" }}>
            <p>
              Please upload the required documents to complete your
              verification.
            </p>
            <IonButton
              color={data?.data.primary_id_url ? "success" : "primary"}
              expand="block"
              fill="outline"
              style={{ marginTop: "20px" }}
              // onClick={() => handleUpload("Primary ID")}
              onClick={() => handleOpenModal("Primary ID")}
            >
              <IonIcon icon={cloudUploadOutline} slot="start" />
              Primary ID
            </IonButton>

            <IonButton
              color={data?.data.secondary_id_url ? "success" : "primary"}
              expand="block"
              fill="outline"
              style={{ marginTop: "10px" }}
              onClick={() => handleOpenModal("Secondary ID")}
            >
              <IonIcon icon={cloudUploadOutline} slot="start" />
              Secondary ID
            </IonButton>
            <IonButton
              color={data?.data.supporting_document_url ? "success" : "primary"}
              fill="outline"
              expand="block"
              style={{ marginTop: "10px", fontSize: "12px" }}
              onClick={() => handleOpenModal("Supporting Document")}
            >
              <IonIcon icon={cloudUploadOutline} slot="start" />
              Supporting Document
            </IonButton>

            <IonButton
              color="primary"
              expand="block"
              style={{ marginTop: "10px" }}
              // onClick={() => handleOpenModal("Supporting Document")}
              onClick={handleSubmit}
              disabled={isReadyToSubmit() ? false : true}
            >
              <IonIcon icon={cloudUploadOutline} slot="start" />
              Submit
            </IonButton>
          </IonCardContent>
        </IonCard>
      )}

      <UploadKYCDocs
        data={data || null}
        // userData={currentUser?.data}
        filename={filename}
        isOpen={showModal}
        onClose={handleCloseModal}
        onDidDismissal={handleCloseModal}
      />
    </div>
  );
};

export default KYCForm;

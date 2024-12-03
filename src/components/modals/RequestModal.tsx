import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonProgressBar,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { useRef, useState } from "react";
import {
  formatDateString,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
import useFirestore from "../../hooks/useFirestore";
import { serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import useRequestHandles from "../../hooks/useHandleRequests";
import useUploadProposal from "../../hooks/useUploadProposal";

type Props = {
  isOpen: boolean;
  onDidDismissal: () => void;
  onClose: () => void;
  selected: any;
};

const RequestModal: React.FC<Props> = ({
  isOpen,
  onDidDismissal,
  onClose,
  selected,
}) => {
  const { handleAccept, handleReject } = useRequestHandles(
    selected
    // onDidDismissal
  );
  const { uploadProposal, uploadProgress, isUploading, downloadURL, error } =
    useUploadProposal(selected?.event_id);
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

  const handleFileClick = () => {
    fileInputRef?.current?.click();
  };

  console.log(selected);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      uploadProposal(file, "proposals");
    }
  };

  const handleUploadProposal = async () => {
    if (file) {
      uploadProposal(file, "proposals");
    }
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDidDismissal}
      // className="modal-container"
    >
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>{selected?.event_title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismissal}>
              <IonIcon icon={closeCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* <IonList className="item-bg-none"> */}
        <IonItem className="item-bg-none">
          <IonLabel slot="start">
            <strong>Host</strong>
            <p slot="start">{selected?.host_name}</p>
          </IonLabel>
        </IonItem>
        <IonItem className="item-bg-none">
          <IonLabel slot="start">
            <strong>Date</strong>
            <p slot="start">{formatDateString(selected?.date_from)}</p>
          </IonLabel>
        </IonItem>
        <IonItem className="item-bg-none">
          <IonLabel>
            <strong>Description</strong>
            <br />
            {/* <p>{selected?.event_description}</p> */}
            <p
              dangerouslySetInnerHTML={{
                __html: selected?.event_description.replace(/\n/g, "<br />"),
              }}
            />
          </IonLabel>
        </IonItem>

        <IonItem className="item-bg-none">
          <IonLabel>
            <strong>Upload Proposal</strong>
            <br />
            <input
              type="file"
              ref={fileInputRef}
              // ref={cropperRef}
              hidden
              // style={{ display: "none" }}
              onChange={handleFileChange}
              // onChange={handleCropperModal}
            />

            <IonButton
              expand="block"
              // onClick={handleUpload}
              onClick={handleFileClick}
              // disabled={isUploading}
            >
              {file ? file.name : "Select A File"}
            </IonButton>
            {isUploading && (
              <IonProgressBar value={uploadProgress / 100}></IonProgressBar>
            )}
          </IonLabel>
        </IonItem>

        {/* </IonList> */}
      </IonContent>

      <IonFooter>
        <IonItem className="item-bg-none">
          <IonButtons slot="end">
            <IonButton
              fill="solid"
              slot="end"
              // strong
              // shape="round"
              color={"primary"}
              onClick={handleUploadProposal}
              // onClick={() => handleAccept(onDidDismissal)}
            >
              {isUploading ? "Uploading..." : "Send Proposal"}
            </IonButton>
            <IonButton
              // fill="outline"
              // shape="round"
              strong
              color={"danger"}
              onClick={() => handleReject(onDidDismissal)}
            >
              Reject
            </IonButton>
          </IonButtons>
        </IonItem>
      </IonFooter>
    </IonModal>
  );
};

export default RequestModal;

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
  IonLoading,
  IonModal,
  IonProgressBar,
  IonRow,
  IonText,
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
import { useHistory, useParams } from "react-router";
import useRequestHandles from "../../hooks/useHandleRequests";
import useUploadProposal from "../../hooks/useUploadProposal";
import useGetRequest from "../../hooks/useGetRequest";

type RouteParams = {
  id: string;
};
const RequestDetails = () => {
  const {
    updateData: updateRequest,
    loading: updatingRequest,
    error: updatingRequestError,
  } = useFirestore("requests");
  const {
    updateData: updateEvent,
    loading: updatingEvent,
    error: updatingEventError,
  } = useFirestore("events");
  const { id } = useParams<RouteParams>();
  const { data: request } = useGetRequest(id);
  // const { handleReject } = useRequestHandles(id);

  const eventId = request?.eventData.id;

  const { uploadProposal, uploadProgress, isUploading, downloadURL, error } =
    useUploadProposal(eventId);
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

  const handleFileClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: any) => {
    const requestFile = event.target.files[0];
    setFile(requestFile);
  };

  // const handleUpload = () => {
  //   if (file) {
  //     uploadProposal(file);
  //   }
  // };

  const handleUploadProposal = async () => {
    if (file) {
      uploadProposal(file);

      await updateRequest(request?.data.id, {
        request_id: request?.data.id,
        is_transaction_complete: true,
        status: "for confirmation",
      });

      history.push("/venue/requests");
    }
  };

  const handleApproval = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this request",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      heightAuto: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateRequest(request?.data.id, {
          is_transaction_complete: true,
          status: "approved",
          isApproved: true,
        });
        await updateEvent(eventId, { status: "approved", isApproved: true });
        history.push("/venue/requests");
      }
    });
  };

  const handleReject = async () => {
    await updateRequest(request?.data.id, {
      is_transaction_complete: true,
      status: "rejected",
    });

    await updateEvent(eventId, { status: "rejected" });
    history.push("/venue/requests");
  };

  return (
    <>
      <div className="ion-padding ion-margin-top ion-margin-left ion-margin-right ">
        <IonItem className="item-bg-none">
          <IonLabel slot="start">
            <strong>Host</strong>
            <p slot="start">
              {request?.hostData.fname} {request?.hostData.lname}
            </p>
          </IonLabel>
        </IonItem>
        <IonItem className="item-bg-none">
          <IonLabel slot="start">
            <strong>Date</strong>
            <p slot="start">{formatDateString(request?.data.date_from)}</p>
          </IonLabel>
        </IonItem>
        <IonItem className="item-bg-none">
          <IonLabel>
            <strong>Description</strong>
            <br />
            {/* <p>{request?.event_description}</p> */}
            <p
              dangerouslySetInnerHTML={{
                __html: request?.eventData?.description?.replace(
                  /\n/g,
                  "<br />"
                ),
              }}
            />
          </IonLabel>
        </IonItem>
        <IonItem className="item-bg-none">
          <IonLabel>
            <strong>Attachments</strong>
            <br />
            {/* <p>{request?.event_description}</p> */}
            {request?.data.request_proposal_url && (
              <a
                slot="end"
                href={request?.data.request_proposal_url}
                target="_blank"
                rel="noopener noreferrer"
                download={"FilledProposal.pdf"}
              >
                View Document
              </a>
            )}
          </IonLabel>
        </IonItem>

        {request?.data?.status === "for confirmation" && (
          <>
            <IonItem className="item-bg-none">
              <IonLabel>
                <strong>Upload Proposal</strong>
                <br />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="application/pdf"
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
              </IonLabel>
            </IonItem>

            <IonItem color={"none"}>
              {isUploading && (
                <IonProgressBar value={uploadProgress / 100}></IonProgressBar>
              )}
              {error && <IonText color="danger">Error: {error}</IonText>}
            </IonItem>
          </>
        )}

        <IonItem className="item-bg-none">
          <IonButtons slot="end">
            <IonButton
              // fill="outline"
              // shape="round"
              slot="end"
              strong
              color={"danger"}
              onClick={handleReject}
            >
              Reject
            </IonButton>

            {request?.data?.status === "requesting proposal" && (
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
            )}

            {request?.data?.status === "for approval" && (
              <IonButton
                fill="solid"
                slot="end"
                // strong
                // shape="round"
                color={"primary"}
                onClick={handleApproval}
                // onClick={() => handleAccept(onDidDismissal)}
              >
                Approve
              </IonButton>
            )}
          </IonButtons>
        </IonItem>
      </div>
    </>
  );
  // return <div>RequestDetails</div>;
};

export default RequestDetails;

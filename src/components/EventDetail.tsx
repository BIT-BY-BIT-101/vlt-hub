import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import useGetDoc from "../hooks/useGetDoc";
import { useHistory, useLocation, useParams } from "react-router";
import EventsModal from "./modals/EventsModal";
import Loader from "./loaders/Loader";
import {
  formatDateString,
  formatTimeString,
} from "../helpers/DateTimeFunctions";
import useGetEvent from "../hooks/useGetEvent";
import PageNotFound from "../pages/error_pages/PageNotFound";
import { Label } from "recharts";
import {
  arrowUpCircleSharp,
  create,
  createSharp,
  remove,
  removeCircleOutline,
  trash,
} from "ionicons/icons";
import { AuthContext } from "../context/AuthContext";
import { UpdateDataContext } from "../context/UpdateDataContext";
import useFirestore from "../hooks/useFirestore";
import { serverTimestamp } from "firebase/firestore";
import useHandleEvents from "../hooks/useHandleEvents";
import useUploadFilledProposal from "../hooks/useUploadFilledProposal";
import useHandleEventRegister from "../hooks/useHandleEventRegister";

type RouteParams = {
  id: string;
};

const EventDetail = () => {
  // const { setData } = useContext(UpdateDataContext);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams<RouteParams>();
  // const { data: event, error, loading } = useGetDoc("events", id);
  const { data: event, error, hostInfo, loading } = useGetEvent(id);
  const { updateData: updateStatus } = useFirestore("events");
  const {
    updateData: updateEvent,
    loading: updatingEvent,
    error: errorUpdatingEvent,
  } = useFirestore("events");
  const { handleDeleEvent } = useHandleEvents();

  const {
    uploadProposal,
    uploadProgress,
    isUploading,
    downloadURL,
    error: uploadError,
  } = useUploadFilledProposal(event?.request_id);

  const { handleCheckout, handleRegister, handleSignin } =
    useHandleEventRegister(id);

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

  const handleUploadProposal = async () => {
    if (file) {
      uploadProposal(file);

      await updateEvent(event?.id, {
        is_transaction_complete: false,
        status: "for approval",
      });

      history.push("/host/event-list");
    }
  };
  if (loading && !event) {
    return <p>loading.....</p>;
  }

  if (error) {
    <IonCard className="card">
      <IonItem className="item-bg-none">Something went wrong</IonItem>
    </IonCard>;
  }

  const handlePublishBtn = async (data: any) => {
    await updateStatus(data.id!, {
      status: "published",
    });
  };
  const handleConfirmed = async (data: any) => {
    await updateStatus(data.id!, {
      status: "paying",
      is_confirmed: true,
      updatedAt: serverTimestamp(),
    });
  };

  // const event = updatedEvent || event;

  // if (event) {
  console.log(event);
  console.log(event?.participants.includes(currentUser?.uid));

  return (
    <>
      <IonGrid>
        <div className="event-page ion-margin-top ion-padding margin-left margin-right">
          <IonRow className="ion-justify-content-center">
            <IonCardTitle>
              {/* <IonItem color={"none"} className="ion-text-center" lines="none"> */}
              <IonLabel className="ion-text-center">
                <h1
                  style={{
                    fontWeight: "bold",
                    color: "var(--ion-color-primary)",
                    fontSize: "1.5rem",
                  }}
                >
                  {event?.title}
                </h1>
              </IonLabel>
              {/* </IonItem> */}
            </IonCardTitle>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <div
              className="ion-margin-left ion-margin-right ion-margin-top"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IonImg
                src={event?.imageUrl}
                style={{ objectFit: "cover", height: "auto", width: "100vw" }}
              />
            </div>
          </IonRow>
          <IonItem color={"none"} className="ion-text-center" lines="none">
            <IonLabel>
              <span
                style={{
                  fontWeight: "bold",
                  width: "100%",
                  color: "var(--ion-color-primary)",
                }}
              >
                by: {hostInfo?.fname} {hostInfo?.lname}{" "}
              </span>
            </IonLabel>
          </IonItem>
          {!event?.participants?.includes(currentUser?.uid) && (
            <>
              {currentUser?.data.role === "participant" && currentUser ? (
                <div className="phome-btn-container">
                  <IonButton
                    expand="block"
                    className="phome-register-btn"
                    onClick={event?.event_fee ? handleCheckout : handleRegister}
                  >
                    {event?.event_fee ? "Pay Now" : "Register"}
                  </IonButton>
                </div>
              ) : (
                <div className="phome-btn-container">
                  <IonButton
                    expand="block"
                    className="phome-register-btn"
                    // routerLink="/participant/signin"
                    onClick={handleSignin}
                  >
                    Please Login
                  </IonButton>
                </div>
              )}
              )
            </>
          )}

          {/* End of Register button */}
          {currentUser?.data.role === "host" && (
            // <IonItem color={"none"}></IonItem>
            <>
              <IonRow>
                <IonCol>
                  {event?.status === "for confirmation" && (
                    <IonButton
                      className="ion-padding"
                      // routerLink={`/host/event/${id}/edit`}
                      onClick={handleUploadProposal}
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Send Proposal"}
                      {/* <IonIcon slot="icon-only" icon={arrowUpCircleSharp} /> */}
                    </IonButton>
                  )}
                  {/* {event?.is_confirmed ? (
                    <IonButton
                      slot="start"
                      className="ion-padding"
                      // routerLink={`/host/event/${id}/edit`}
                      onClick={() => handlePublishBtn(event)}
                      disabled={event.is_confirmed ? false : true}
                    >
                      Publish
                      <IonIcon slot="icon-only" icon={createSharp} />
                    </IonButton>
                  ) : (
                    <IonButton
                      className="ion-padding"
                      // routerLink={`/host/event/${id}/edit`}
                      onClick={() => handleConfirmed(event)}
                      disabled={event?.status !== "confirming" ? true : false}
                    >
                      {event?.status !== "confirming" ? "Pending" : "Confirm"}
                      <IonIcon slot="icon-only" icon={arrowUpCircleSharp} />
                    </IonButton>
                  )} */}
                </IonCol>
                <IonButton
                  disabled={event?.isPublished ? true : false}
                  // slot="end"
                  className="ion-padding"
                  routerLink={`/host/event/${id}/edit`}
                >
                  Edit Course
                  <IonIcon slot="icon-only" icon={createSharp} />
                </IonButton>
                <IonButton
                  disabled={event?.isPublished ? true : false}
                  className="ion-padding"
                  color={"danger"}
                  onClick={() => handleDeleEvent(id)}
                >
                  Delete
                  <IonIcon slot="icon-only" icon={trash} />
                </IonButton>
              </IonRow>
              {event?.status === "for confirmation" && (
                <>
                  <IonRow>
                    <IonCol>
                      <IonItem color={"none"} lines="none">
                        <IonLabel slot="start">
                          <span
                            style={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              // color: "var(--ion-color-primary)",
                              color: "black",
                            }}
                          >
                            Proposal:{" "}
                          </span>
                          <a
                            slot="end"
                            href={event?.proposal_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </a>
                        </IonLabel>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
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
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonItem color={"none"}>
                      {isUploading && (
                        <IonProgressBar
                          value={uploadProgress / 100}
                        ></IonProgressBar>
                      )}
                      {uploadError && (
                        <IonText color="danger">Error: {uploadError}</IonText>
                      )}
                    </IonItem>
                  </IonRow>
                </>
              )}
            </>
          )}
          <IonItem color={"none"} lines="none">
            <IonLabel slot="start">
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "var(--ion-color-primary)",
                }}
              >
                Date:{" "}
              </span>
              <p style={{ color: "black" }}>
                {formatDateString(event?.date_from)}
              </p>
            </IonLabel>
          </IonItem>
          <IonItem className="item-bg-none" lines="none">
            <IonLabel>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "var(--ion-color-primary)",
                }}
              >
                Time:{" "}
              </span>
              <p style={{ color: "black" }}>
                {formatTimeString(event?.start_time)} -{" "}
                {formatTimeString(event?.end_time)}
              </p>
            </IonLabel>
          </IonItem>
          <IonItem className="item-bg-none" lines="none">
            <IonLabel>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "var(--ion-color-primary)",
                }}
              >
                Description:
              </span>
            </IonLabel>
          </IonItem>
          <IonCardContent>
            {/* <IonItem className="item-bg-none">{event?.description}</IonItem> */}
            <p
              style={{ color: "black" }}
              dangerouslySetInnerHTML={{
                __html: event?.description.replace(/\n/g, "<br />"),
              }}
            />
          </IonCardContent>
        </div>
      </IonGrid>
    </>
  );
};

export default EventDetail;

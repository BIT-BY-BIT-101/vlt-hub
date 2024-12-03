import {
  IonCardTitle,
  IonItem,
  IonLabel,
  IonImg,
  IonButton,
  IonIcon,
  IonCardContent,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonRouterLink,
  IonButtons,
} from "@ionic/react";
import { createSharp, arrowUpCircleSharp } from "ionicons/icons";
import React from "react";
import {
  formatDateString,
  formatTimeString,
} from "../../helpers/DateTimeFunctions";
import { useHistory, useParams } from "react-router";
import useGetKYC from "../../hooks/useGetKYC";
import Loader from "../loaders/Loader";
import useListKYCDocuments from "../../hooks/useListKYCDocuments";
import Swal from "sweetalert2";
import useFirestore from "../../hooks/useFirestore";
import { serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import nodeMailApi from "../../config/nodemail";

type RouteParams = {
  id: string;
};

const KYCDetails = () => {
  const { id } = useParams<RouteParams>();
  const {
    updateData: updateKYCSession,
    loading: updating,
    error: updateError,
  } = useFirestore("kyc_sessions");

  const {
    updateData: updateProfile,
    loading: updatingProfile,
    error: updateErrorProfile,
  } = useFirestore("profiles");

  const { data: kycData, loading, error } = useGetKYC(id);
  const {
    documents,
    loading: documentLoading,
    error: documentError,
  } = useListKYCDocuments(kycData?.data?.user_id);

  const history = useHistory();
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const kycId = kycData?.data?.id;
  const hostId = kycData?.data?.user_id;

  // console.log(kycData?.data.id);
  // console.table(documents);

  const handleAccept = async () => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      text: "Do you want to accept this KYC?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
      heightAuto: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Accepting.....");

        Swal.fire({
          heightAuto: false,
          position: "top-right",
          title: "Accepting..",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        (async () => {
          try {
            await updateKYCSession(kycId, {
              status: "verified",
              is_transaction_complete: true,
              isVerified: true,
              verifiedAt: serverTimestamp(),
            });

            await updateProfile(hostId, {
              isVerified: true,
              verifiedAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });

            // const payload = {
            //   name: userData?.fname,
            //   subject: "New Course Created",
            //   email: currentUser?.email,
            //   message: emailMessage,
            // };

            // const token = await getAuth().currentUser?.getIdToken(true);

            // nodeMailApi.post("api/v1/mail/send-email", payload, {
            //   headers: {
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${token}`,
            //   },
            // });

            await Swal.fire({
              heightAuto: false,
              icon: "success",
              title: "KYC accepted successfully",
              showConfirmButton: true,
            }); //end of then

            history.push("/venue/verification-requests");
          } catch (error) {
            (async () => {
              await updateKYCSession(kycId, {
                status: "verifiying",
                is_transaction_complete: false,
                isVerified: false,
                verifiedAt: null,
              });

              await updateProfile(hostId, {
                isVerified: false,
                verifiedAt: null,
                updatedAt: serverTimestamp(),
              });
              Swal.fire({
                heightAuto: false,
                // position: "top-right",
                icon: "error",
                title: "Error accepting KYC",
                showConfirmButton: true,
              });
            })();
          }
        })(); //end of block
      } //end of if
    }); //end of then
  };
  return (
    <>
      <div
        className="card ion-padding margin-left margin-right"
        // style={{ height: "100vw" }}
      >
        <IonCardTitle>
          <IonGrid>
            <IonRow>
              <IonCol size="2" sizeMd="3" sizeSm="12" sizeXs="12">
                <IonItem lines="none" color={"none"}>
                  <IonThumbnail
                    // slot="start"
                    style={{ width: "200px", height: "auto" }}
                  >
                    <IonImg
                      src={
                        kycData?.hostData?.photoURL
                          ? kycData?.hostData?.photoURL
                          : "https://ionicframework.com/docs/img/demos/thumbnail.svg"
                      }
                    />
                  </IonThumbnail>
                </IonItem>
              </IonCol>
              <IonCol sizeMd="8" sizeSm="12" sizeXs="12">
                <IonRow>
                  <IonItem
                    lines="none"
                    color={"none"}
                    style={{ width: "100%" }}
                  >
                    <IonLabel slot="start" style={{ width: "auto" }}>
                      <h1
                        style={{
                          fontWeight: "bold",
                          color: "var(--ion-color-primary)",
                          width: "relative",
                        }}
                      >
                        {kycData?.hostData?.fname} {kycData?.hostData?.lname}
                      </h1>
                      <span style={{ color: "black" }}>
                        {kycData?.hostData?.email}
                      </span>
                    </IonLabel>
                  </IonItem>
                  <IonItem
                    lines="none"
                    color={"none"}
                    style={{ width: "100%" }}
                  >
                    <IonLabel slot="start" style={{ width: "auto" }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "black",
                        }}
                      >
                        Birthdate:{" "}
                      </span>
                      <IonText color={"primary"}>
                        {formatDateString(kycData?.hostData?.birthdate)}
                      </IonText>
                    </IonLabel>
                  </IonItem>
                  <IonItem
                    lines="none"
                    color={"none"}
                    style={{ width: "100%" }}
                  >
                    <IonLabel slot="start" style={{ width: "auto" }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "black",
                        }}
                      >
                        Address:{" "}
                      </span>
                      <IonText color={"primary"}>
                        {`${kycData?.hostData?.bldg_no}, ${kycData?.hostData?.street}, ${kycData?.hostData?.city}, `}
                      </IonText>
                    </IonLabel>
                  </IonItem>
                </IonRow>
              </IonCol>
            </IonRow>
            <IonItem color={"primary"}>
              <IonLabel>
                <h1
                  style={{
                    fontWeight: "bold",
                    // color: "var(--ion-color-primary)",
                    color: "white",
                    width: "relative",
                  }}
                >
                  Company Details
                </h1>
              </IonLabel>
            </IonItem>
            <IonRow>
              <IonCol sizeMd="8" sizeSm="12" sizeXs="12">
                <IonRow>
                  <IonItem
                    lines="none"
                    color={"none"}
                    style={{ width: "100%" }}
                  >
                    <IonLabel slot="start" style={{ width: "auto" }}>
                      <h1
                        style={{
                          fontWeight: "bold",
                          color: "var(--ion-color-primary)",
                          width: "relative",
                        }}
                      >
                        {kycData?.hostData?.company_name}{" "}
                      </h1>
                      <span style={{ color: "black" }}>
                        {kycData?.hostData?.company_email}
                      </span>
                    </IonLabel>
                  </IonItem>

                  <IonItem
                    lines="none"
                    color={"none"}
                    style={{ width: "100%" }}
                  >
                    <IonLabel slot="start" style={{ width: "auto" }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "black",
                        }}
                      >
                        Address:{" "}
                      </span>
                      <IonText color={"primary"}>
                        {kycData?.hostData?.company_address}
                      </IonText>
                    </IonLabel>
                  </IonItem>
                </IonRow>
              </IonCol>
            </IonRow>

            <IonItem color={"primary"}>
              <IonLabel>
                <h1
                  style={{
                    fontWeight: "bold",
                    // color: "var(--ion-color-primary)",
                    color: "white",
                    width: "relative",
                  }}
                >
                  Attachments
                </h1>
              </IonLabel>
            </IonItem>
            <IonRow>
              <IonCol sizeMd="8" sizeSm="12" sizeXs="12">
                <IonRow>
                  {documents.map((file, index) => (
                    <IonItem
                      lines="none"
                      color={"none"}
                      style={{ width: "100vh%" }}
                      key={index}
                    >
                      <IonLabel slot="start" style={{ width: "100vh" }}>
                        <span style={{ fontWeight: "bold", color: "black" }}>
                          {`${file.name}: `}
                        </span>
                      </IonLabel>
                      <a
                        slot="end"
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Document
                      </a>
                    </IonItem>
                  ))}
                </IonRow>
              </IonCol>
            </IonRow>
            <IonItem color={"primary"}>
              <IonLabel>
                <span
                  style={{
                    fontWeight: "bold",
                    // color: "var(--ion-color-primary)",
                    color: "white",
                    width: "relative",
                  }}
                >
                  Actions
                </span>
              </IonLabel>
            </IonItem>
            <IonRow>
              <IonCol>
                <IonItem lines="none" color={"none"} style={{ width: "100%" }}>
                  <IonLabel slot="start" style={{ width: "auto" }}>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: "black",
                      }}
                    >
                      Status:{" "}
                    </span>
                    <IonText color={"primary"}>{kycData?.data?.status}</IonText>
                  </IonLabel>
                </IonItem>
                <IonItem lines="none" color={"none"} style={{ width: "100%" }}>
                  <IonLabel slot="end" style={{ width: "auto" }}>
                    <IonButton onClick={handleAccept}>Accept</IonButton>
                  </IonLabel>
                  <IonLabel slot="end" style={{ width: "auto" }}>
                    <IonButton>Reject</IonButton>
                  </IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardTitle>
      </div>
    </>
  );
};

export default KYCDetails;

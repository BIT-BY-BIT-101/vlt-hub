import { IonItem, IonLabel, IonList } from "@ionic/react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { formatDateString } from "../../helpers/DateTimeFunctions";
import { handleWindowRoute } from "../../helpers/Helpers";
import useFetchRequests from "../../hooks/useFetchRequests";
import RequestModal from "../modals/RequestModal";
import useFetchKYCs from "../../hooks/useFetchKYCs";
import useGetDoc from "../../hooks/useGetDoc";
import { useHistory } from "react-router";

const VerificationRequest = () => {
  const { currentUser } = useContext(AuthContext);

  const { data: kycRequests } = useFetchKYCs();
  const history = useHistory();

  const handleRoute = () => {
    history.push("/venue/verification-requests/details");
  };

  return (
    <>
      <IonItem
        style={{ color: "var(--ion-color-primary)" }}
        color={"none"}
        lines="none"
      >
        <IonLabel>
          <h1 style={{ fontWeight: "bold" }}>User KYC Verification</h1>
        </IonLabel>
      </IonItem>
      {kycRequests?.length === 0 ? (
        <div className="card">
          <IonList className="item-bg-none">
            <IonItem className="item-bg-none">
              <IonLabel>No Requests at the moment</IonLabel>
            </IonItem>
          </IonList>
        </div>
      ) : (
        kycRequests?.map((request: any) => (
          <div className="ion-margin my-items" key={request.kycData?.id}>
            <IonList className="item-bg-none">
              <IonItem
                routerLink={`/venue/verification-requests/details/${request?.kycData?.id}`}
                // onClick={handleRoute}
                className="item-bg-none cursor-pointer"
              >
                <IonLabel slot="start" className="item-label">
                  Name
                  <p>{request.hostData.fname}</p>
                </IonLabel>
                <IonLabel slot="start" className="item-label">
                  Date
                  <p>
                    {formatDateString(request.kycData?.date_submitted.toDate())}
                  </p>
                </IonLabel>

                <IonLabel slot="end">
                  Status
                  <p>{request.kycData?.status}</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </div>
        ))
      )}

      {/* <ChatBox isOpen={isOpen} id={chatroomId} /> */}
    </>
  );
};

export default VerificationRequest;

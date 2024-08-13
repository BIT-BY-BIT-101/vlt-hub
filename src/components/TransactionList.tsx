import { IonButton, IonCard, IonItem, IonLabel, IonList } from "@ionic/react";
import React, { useContext, useState } from "react";
import TransactionDetailsModal from "./modals/TransactionDetailsModal";
import useQuery from "../hooks/useQuery";
import { AuthContext } from "../context/AuthContext";

const TransactionList = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useQuery("transactions", "user_id", "==", currentUser?.uid);
  const [isOpen, setIsOpen] = useState(false);

  const handleDetails = () => {
    console.log("View Details");
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <IonCard className="card">
        {data.length !== 0 ? (
          data.map((item: any) => (
            <IonList className="item-color-dark">
              <IonItem className="item-color">
                <IonLabel>Transaction 1</IonLabel>
                <IonButton
                  color={"tertiary"}
                  shape="round"
                  className="ion-padding"
                >
                  <IonLabel>View</IonLabel>
                </IonButton>
              </IonItem>
              <TransactionDetailsModal
                isOpen={isOpen}
                selected={item}
                onClose={handleClose}
                onDissmissal={handleClose}
              />
            </IonList>
          ))
        ) : (
          <IonList className="item-color-dark">
            <IonItem className="item-color">
              <IonLabel>No Transaction</IonLabel>
            </IonItem>
          </IonList>
        )}
      </IonCard>
    </>
  );
};

export default TransactionList;

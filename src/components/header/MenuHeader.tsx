import {
  IonHeader,
  IonToolbar,
  IonImg,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { pencil } from "ionicons/icons";
import React from "react";
import UserImg from "../../assets/user.jpg";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { useHistory } from "react-router-dom";

const MenuHeader = () => {
  const { userData } = useFirebaseAuth();
  const history = useHistory();
  return (
    <IonHeader>
      <IonToolbar class="phome-menu-header">
        <IonImg
          src={UserImg}
          alt="V.L.T. Hub"
          className="phome-logocontainer"
        />
        <div className="phome-userinfo">
          <IonLabel class="phome-username">
            {userData?.fname} {userData?.lname}
          </IonLabel>
          <IonButtons>
            <IonButton
              className="phome-editprofile"
              onClick={() => history.push("/participant/profile")}
            >
              <IonIcon icon={pencil} />
              My Profile
            </IonButton>
          </IonButtons>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default MenuHeader;

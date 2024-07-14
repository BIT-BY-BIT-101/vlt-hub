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
import React, { useContext } from "react";
import UserImg from "../../assets/user.jpg";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const MenuHeader = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  function handleLink() {
    if (currentUser?.data.role === "participant") {
      history.push("/participant/profile");
    }
    if (currentUser?.data.role === "host") {
      history.push("/host/profile");
    }
    if (currentUser?.data.role === "venue") {
      history.push("/venue/profile");
    }
  }
  return (
    <IonHeader>
      <IonToolbar class="phome-menu-header">
        <IonImg
          src={
            currentUser?.data.photoURL ? currentUser?.data.photoURL : UserImg
          }
          alt="V.L.T. Hub"
          className="phome-logocontainer"
        />
        <div className="phome-userinfo">
          <IonLabel class="phome-username">
            {currentUser?.data.fname} {currentUser?.data.lname}
          </IonLabel>
          <IonButtons>
            <IonButton className="phome-editprofile" onClick={handleLink}>
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

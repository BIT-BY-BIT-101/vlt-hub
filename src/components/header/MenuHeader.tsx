import {
  IonHeader,
  IonToolbar,
  IonImg,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol,
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
      <IonToolbar
        color={"primary"}
        // class="phome-menu-header"
      >
        <IonGrid>
          <IonRow>
            <IonCol>
              {/* <IonThumbnail> */}
              <IonImg
                src={
                  currentUser?.data.photoURL
                    ? currentUser?.data.photoURL
                    : "https://ionicframework.com/docs/img/demos/thumbnail.svg"
                }
                alt="V.L.T. Hub"
                // className="phome-logocontainer"
                className="profile-img"
              />
              {/* </IonThumbnail> */}
            </IonCol>

            <IonCol>
              <div className="phome-userinfo">
                <IonLabel class="phome-username">
                  {currentUser?.data.fname} {currentUser?.data.lname}
                </IonLabel>
                <IonButtons>
                  <IonButton
                    fill="outline"
                    shape="round"
                    size="small"
                    // className="phome-editprofile"
                    onClick={handleLink}
                  >
                    <IonIcon slot="icon-only" icon={pencil} />
                    <span>My Profile</span>
                  </IonButton>
                </IonButtons>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  );
};

export default MenuHeader;

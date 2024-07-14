import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import "./UploadProfileImg.css";
import { ChangeEvent, useRef, useState } from "react";
import useFirebaseStorage from "../../hooks/useFirestorage";
import { useForm } from "react-hook-form";
import useFirestore from "../../hooks/useFirestore";
import { auth } from "../../config/firebase";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import Swal from "sweetalert2";

type UploadImgProps = {
  userData: any;
  isOpen: boolean;
  onDidDismissal: () => void;
  onClose: () => void;
};
const UploadProfileImg: React.FC<UploadImgProps> = ({
  userData,
  isOpen,
  onDidDismissal,
  onClose,
}) => {
  const { updateProfileImage, error: uploadError } = useUpdateProfile();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>();
  const [imgUrl, setImgUrl] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { updateData } = useFirestore("profiles");

  const { register, handleSubmit, reset } = useForm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDismissal = () => {
    onDidDismissal();
    onClose();
    setImagePreviewUrl(null);
    setImgUrl(null);
    reset();
  };

  const handleImageClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);

    if (file) {
      const img = file;
      const imageUrl = URL.createObjectURL(file);
      console.log("image: ", img);
      console.log("url: ", imageUrl);
      setImgUrl(img);
      setImagePreviewUrl(imageUrl);
    } else {
      setImagePreviewUrl(null);
      setImgUrl(null);
    }
  };

  // const handleUpload = async () => {
  //   await uploadImage(imgUrl, Date.now());
  //   console.log(imgUrl);
  // };

  const onSubmit = async () => {
    const id = auth.currentUser?.uid;

    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
      heightAuto: false,
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        Swal.fire({
          heightAuto: false,
          position: "top-right",
          title: "Uploading..",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(async () => {
          await updateProfileImage(imgUrl, Date.now(), id).then(() => {
            console.error(uploadError);

            if (uploadError === null) {
              Swal.fire({
                heightAuto: false,
                position: "top-right",
                icon: "success",
                title: "Profile picture uploaded",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                reset();
                onClose();
              });
            } else {
              Swal.fire({
                heightAuto: false,
                position: "top-right",
                icon: "error",
                title: "Errror",
                text: "Something went wrong",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          });
        });
      }
    });

    // onClose();
  };
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismissal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upload Picture</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismissal}>
              <IonIcon icon={closeCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem className="item-color-dark">
          <IonImg
            onClick={handleImageClick}
            className="profile-preview"
            src={
              userData?.photoURL
                ? imagePreviewUrl || userData?.photoURL
                : "https://ionicframework.com/docs/img/demos/thumbnail.svg"
            }
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </IonItem>
      </IonContent>
      <IonFooter>
        <IonItem
          className="ion-align-items-end item-color-dark"
          style={{ marginBottom: "20px" }}
        >
          {/* <IonButtons slot="start">
            <IonButton onClick={handleUpload}>Upload</IonButton>
          </IonButtons> */}
          <IonButtons slot="end">
            <IonButton
              onClick={handleSubmit(onSubmit)}
              disabled={!imagePreviewUrl}
            >
              Save
            </IonButton>
            <IonButton onClick={handleDismissal}>Cancel</IonButton>
          </IonButtons>
        </IonItem>
      </IonFooter>
    </IonModal>
  );
};

export default UploadProfileImg;

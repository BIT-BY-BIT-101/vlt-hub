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

import { ChangeEvent, createRef, useContext, useRef, useState } from "react";
import useFirebaseStorage from "../../hooks/useFirestorage";
import { set, useForm } from "react-hook-form";
import useFirestore from "../../hooks/useFirestore";
import { auth } from "../../config/firebase";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import Swal from "sweetalert2";
import Cropper, { ReactCropperElement } from "react-cropper";
import AvatarImageCropper from "./AvatarImageCropper";
import { defaultImg } from "../../helpers/Helpers";
import useUploadKYCFiles from "../../hooks/useUploadKYCFiles";
import { AuthContext } from "../../context/AuthContext";
import useGetKYC from "../../hooks/useGetKYC";
import { DocumentData } from "firebase/firestore";

type UploadImgProps = {
  data: DocumentData | null;
  isOpen: boolean;
  onDidDismissal: () => void;
  onClose: () => void;
  filename: string | null;
};
const UploadKYCDocs: React.FC<UploadImgProps> = ({
  data,
  isOpen,
  onDidDismissal,
  onClose,
  filename,
}) => {
  const { currentUser } = useContext(AuthContext);
  const kyc_session_id = currentUser?.data.kyc_session_id;
  const {
    uploadDocuments,
    loading,
    error: uploadError,
    isUploading,
  } = useUploadKYCFiles();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>();
  const [imgUrl, setImgUrl] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { updateData } = useFirestore("profiles");

  const { register, handleSubmit, reset } = useForm();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<any>(defaultImg);
  // const cropperRef = createRef<ReactCropperElement>();

  const handleDismissal = () => {
    setImagePreviewUrl(null);
    setImgUrl(null);
    reset();
    onDidDismissal();
    onClose();
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

  //   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0];
  //     setSelectedFile(file || null);

  //     if (file) {
  //       const reader = new FileReader();

  //       reader.onloadend = () => {
  //         const base64Image = reader.result as string;
  //         console.log("Base64 Image: ", base64Image);
  //         // setImgUrl(file); // Keep the original file if needed for uploading
  //         setImage(base64Image); // Set the Base64 image for the cropper
  //         setCropperModal(true); // Trigger the cropper modal
  //       };

  //       reader.readAsDataURL(file); // Convert file to Base64
  //     } else {
  //       setImagePreviewUrl(null);
  //       setImgUrl(null);
  //     }
  //   };

  // const handleUpload = async () => {
  //   await uploadImage(imgUrl, Date.now());
  //   console.log(imgUrl);
  // };

  //   function handleCloseCropperModal() {
  //     setImage(undefined);
  //     setCropperModal(false);
  //   }

  //   async function onSaveCroppedImage(croppedBase64Image: string) {
  //     if (croppedBase64Image) {
  //       const blob = await (await fetch(croppedBase64Image)).blob(); // Convert Base64 to Blob
  //       setImgUrl(blob);
  //       console.log(blob);
  //     }
  //     setCroppedBase64(croppedBase64Image); // Save the cropped image in Base64 format
  //     setImagePreviewUrl(croppedBase64Image);
  //     // setImgUrl(croppedBase64Image);
  //     setCropperModal(false); // Close the cropper modal
  //   }

  function onCancel() {
    setImgUrl(null);
    setImagePreviewUrl(null);
  }

  const onSubmit = async () => {
    const id = auth.currentUser?.uid;

    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
      heightAuto: false,
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        // Show loading until upload completes
        Swal.fire({
          heightAuto: false,
          position: "top-right",
          title: "Uploading..",
          didOpen: () => {
            Swal.showLoading(); // Keep loading animation
          },
        });

        try {
          // Await the upload process
          await uploadDocuments(imgUrl, filename);

          // If no errors, show success message
          Swal.fire({
            heightAuto: false,
            // position: "top-right",
            icon: "success",
            title: "Success",
            text: "Document uploaded successfully",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            // setImagePreviewUrl(null);
            // setImgUrl(null);
            reset();
            onClose();
          });
        } catch (err) {
          // If there's an error, show error message
          Swal.fire({
            heightAuto: false,
            // position: "top-right",
            icon: "error",
            title: "Error",
            text: "Something went wrong",
            showConfirmButton: true,
            // timer: 2000,
          });
        }
      }
    });

    // onClose();
  };

  console.log(data);

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={() => {
        setImgUrl(null);
        setImagePreviewUrl(null);
        reset();
        onDidDismissal();
        onClose();
      }}
    >
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
          {filename === "Primary ID" && (
            <IonImg
              onClick={handleImageClick}
              className="profile-preview"
              src={
                data?.data.primary_id_url
                  ? imagePreviewUrl || data?.data.primary_id_url
                  : imagePreviewUrl ||
                    "https://ionicframework.com/docs/img/demos/thumbnail.svg"
              }
            />
          )}
          {filename === "Secondary ID" && (
            <IonImg
              onClick={handleImageClick}
              className="profile-preview"
              src={
                data?.data.secondary_id_url
                  ? imagePreviewUrl || data?.data.secondary_id_url
                  : imagePreviewUrl ||
                    "https://ionicframework.com/docs/img/demos/thumbnail.svg"
              }
            />
          )}
          {filename === "Supporting Document" && (
            <IonImg
              onClick={handleImageClick}
              className="profile-preview"
              src={
                data?.data.supporting_document_url
                  ? imagePreviewUrl || data?.data.supporting_document_url
                  : imagePreviewUrl ||
                    "https://ionicframework.com/docs/img/demos/thumbnail.svg"
              }
            />
          )}
          <input
            type="file"
            ref={fileInputRef}
            // ref={cropperRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            // onChange={handleCropperModal}
          />
        </IonItem>

        {/* <AvatarImageCropper
          open={cropperModal}
          onDidDismissal={handleCloseCropperModal}
          imageSrc={image}
          onSaveCroppedImage={onSaveCroppedImage}
          onCancel={onCancel}
        /> */}
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

export default UploadKYCDocs;

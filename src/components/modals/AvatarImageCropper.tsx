import {
  IonButton,
  IonButtons,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle, image } from "ionicons/icons";
import React, { createRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import { defaultImg } from "../../helpers/Helpers";

const AvatarImageCropper = ({
  open,
  onDidDismissal,
  imageSrc,
  onSaveCroppedImage,
  onCancel,
}: {
  open: boolean;
  onDidDismissal: () => void;
  imageSrc: string;
  onSaveCroppedImage: (croppedBase64Image: string) => void;
  onCancel: () => void;
}) => {
  const cropperRef = createRef<ReactCropperElement>();
  const [croppedImage, setCropImage] = useState<string>();

  // const onChange = (e: any) => {
  //   e.preventDefault();
  //   let files;
  //   if (e.dataTransfer) {
  //     files = e.dataTransfer.files;
  //   } else if (e.target) {
  //     files = e.target.files;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImage(reader.result as any);
  //   };
  //   reader.readAsDataURL(files[0]);
  // };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const cropData = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      // .toBlob((blob) => {
      //   if (blob) {
      //     const croppedImageURL = URL.createObjectURL(blob); // Create a URL from the Blob
      //     onSaveCroppedImage(croppedImageURL); // Pass the URL back to the parent component
      //     console.log("url: ", croppedImageURL);
      //   }
      // });
      console.log(cropData);
      // setCropImage(cropData);
      onSaveCroppedImage(cropData);
      // onDidDismissal();
    }
  };

  return (
    <IonModal isOpen={open} onDidDismiss={onDidDismissal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upload Picture</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => onDidDismissal()}>
              <IonIcon icon={closeCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <Cropper
        ref={cropperRef}
        style={{ height: 400, width: "100%" }}
        // zoomTo={0}
        initialAspectRatio={1}
        preview=".img-preview"
        src={imageSrc}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        guides={true}
        cropBoxMovable={false}
        cropBoxResizable={false}
        dragMode="move"
        // draggable={false}
      />

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
              onClick={getCropData}
              // disabled={!imagePreviewUrl}
            >
              Save
            </IonButton>
            <IonButton
              onClick={() => {
                onCancel();
                onDidDismissal();
              }}
            >
              Cancel
            </IonButton>
          </IonButtons>
        </IonItem>
      </IonFooter>
    </IonModal>
  );
};

export default AvatarImageCropper;

import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonFooter,
  IonItem,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React, { createRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";

const EventImageCropper = ({
  open,
  onDidDismissal,
  imageSrc,
  onSaveCroppedImage,
}: {
  open: boolean;
  onDidDismissal: () => void;
  imageSrc: string;
  onSaveCroppedImage: (croppedBase64Image: string) => void;
}) => {
  const cropperRef = createRef<ReactCropperElement>();
  const [croppedImage, setCropImage] = useState<string>();
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
        // zoomTo={0.5}
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
            <IonButton onClick={onDidDismissal}>Cancel</IonButton>
          </IonButtons>
        </IonItem>
      </IonFooter>
    </IonModal>
  );
};

export default EventImageCropper;

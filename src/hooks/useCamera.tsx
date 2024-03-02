import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import React, { useState } from "react";
import useFirebaseStorage from "./useFirestorage";

export type PhotoProps = {
  filepath?: string;
  dataUrl?: string;
};

const useCamera = () => {
  const [photos, setPhotos] = useState<PhotoProps>();
  // const [photos, setPhotos] = useState<string>();
  const [error, setError] = useState();
  const [uploading, setUploading] = useState(false);
  async function takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        allowEditing: false,
        quality: 90,
      });
      const fileName = Date.now() + ".jpeg";
      // const newPhotos = photo.dataUrl;
      const newPhotos = {
        filepath: fileName,
        dataUrl: photo.dataUrl,
        // webviewPath: photo.webPath,
      };
      setUploading(true);
      setPhotos(newPhotos);

      console.log("Uploading image: ", newPhotos);
    } catch (err) {
      console.log("Error", err);
    } finally {
      setUploading(false);
    }
  }

  return {
    photos,
    takePhoto,
    uploading,
    error,
  };
};

export default useCamera;

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import React, { useState } from "react";
import useFirebaseStorage from "./useFirestorage";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export type PhotoProps = {
  filepath?: string;
  dataUrl?: string;
};

const usePhotoUpload = (path: string) => {
  const [photos, setPhotos] = useState<PhotoProps>();
  // const [photos, setPhotos] = useState<string>();
  const [error, setError] = useState();
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState<boolean>(true);
  async function takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        allowEditing: false,
        quality: 70,
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

      const storageRef = ref(storage, path);
      const imageRef = ref(storageRef, fileName);

      const snapshot = await uploadString(
        imageRef,
        newPhotos?.dataUrl!,
        "data_url"
      );
      console.log("Uploaded a blob or file! ", snapshot);
      // Upload completed successfully, get download URL
      const downloadUrl = await getDownloadURL(snapshot.ref);
      setImageUrl(downloadUrl);

      console.log("Uploading image: ", newPhotos);
    } catch (err) {
      console.log("Error", err);
    } finally {
      setUploading(false);
    }
  }

  return {
    imageUrl,
    photos,
    takePhoto,
    uploading,
    error,
  };
};

export default usePhotoUpload;

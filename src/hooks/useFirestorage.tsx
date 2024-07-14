import { useEffect, useState } from "react";
import { storage } from "../config/firebase"; // Import your Firebase configuration
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import imageCompression from "browser-image-compression";

type StorageHook = {
  imageUrl: string | null;
  error: any; // Update this type based on your error handling
  uploadImage: (file: File, filename: string) => Promise<void>;
  isUploading: boolean;
  imageName: string;
};

const useFirebaseStorage = (path: string): StorageHook => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);
  const [isUploading, setIsUploading] = useState<boolean>(true);

  const compressImage = async (file: File): Promise<Blob> => {
    const options = {
      maxSizeMB: 1, // Max size in megabytes
      maxWidthOrHeight: 1920, // Max width or height of the image
      useWebWorker: true, // Use web worker for faster compression
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    }
  };

  /**
   *
   * @param file a file that will be uploaded
   * @param filename the name of the file
   */
  const uploadImage = async (file: File, filename: string) => {
    try {
      setIsUploading(true);

      const compressedFile = await compressImage(file);

      const storageRef = ref(storage, path);
      const imageRef = ref(storageRef, `${filename}`);

      // const snapshot = await uploadString(imageRef, file, "data_url");
      // const snapshot = await uploadBytes(imageRef, file);
      const snapshot = await uploadBytes(imageRef, compressedFile);
      console.log("Uploaded a blob or file! ", snapshot);
      // Upload completed successfully, get download URL
      const downloadUrl = await getDownloadURL(snapshot.ref);
      const imageName = snapshot.metadata.fullPath;
      console.log("path: ", imageName);
      setImageUrl(downloadUrl);
      setImageName(imageName);
    } catch (err) {
      console.log("Error: ", err);
      setError(err);
    } finally {
      setIsUploading(false);
    }
  };

  // const deleteImage = async () => {
  //   if (imageName) {
  //     try {
  //       const imageRef = ref(storage, imageName);
  //       await deleteObject(imageRef);
  //       setImageUrl(null);
  //       setImageName(null);
  //       console.log("Image deleted successfully");
  //     } catch (err) {
  //       console.error("Error deleting image:", err);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     if (imageName) {
  //       deleteImage();
  //       event.preventDefault();
  //       event.returnValue = "";
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [imageName]);

  return { imageUrl, error, uploadImage, isUploading, imageName };
};

export default useFirebaseStorage;

import { useState } from "react";
import { storage } from "../config/firebase"; // Import your Firebase configuration
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";

type StorageHook = {
  imageUrl: string | null;
  error: any; // Update this type based on your error handling
  uploadImage: (file: string, path: string) => void;
  isUploading: boolean;
};

const useFirebaseStorage = (path: string): StorageHook => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);
  const [isUploading, setIsUploading] = useState<boolean>(true);

  const uploadImage = async (file: string, filename: string) => {
    try {
      const storageRef = ref(storage, path);
      const imageRef = ref(storageRef, `${filename}`);

      const snapshot = await uploadString(imageRef, file, "data_url");
      console.log("Uploaded a blob or file! ", snapshot);
      // Upload completed successfully, get download URL
      const downloadUrl = await getDownloadURL(snapshot.ref);
      setImageUrl(downloadUrl);
    } catch (err) {
      console.log("Error: ", err);
      setError(err);
    } finally {
      setIsUploading(false);
    }
  };

  return { imageUrl, error, uploadImage, isUploading };
};

export default useFirebaseStorage;

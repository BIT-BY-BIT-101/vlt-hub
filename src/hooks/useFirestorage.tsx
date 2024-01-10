import { useState } from "react";
import { storage } from "../config/firebase"; // Import your Firebase configuration
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type StorageHook = {
  imageUrl: string | null;
  error: any; // Update this type based on your error handling
  uploadImage: (file: File, path: string) => void;
};

const useFirebaseStorage = (path: string): StorageHook => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);

  const uploadImage = async () => {
    const storageRef = ref(storage, path);
    const imageRef = ref(storage, `${path}/${imageUrl.name}`);

    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    // Upload completed successfully, get download URL
    const downloadUrl = await getDownloadURL(imageRef);
    setImageUrl(downloadUrl);
  };

  return { imageUrl, error, uploadImage };
};

export default useFirebaseStorage;

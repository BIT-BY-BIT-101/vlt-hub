import { useState } from "react";
import { storage } from "../config/firebase";
import { ref } from "firebase/storage";

type uploadProps = {
  uploadImage: (file: File) => Promise<string>; // Returns the download URL of the uploaded image
  uploading: boolean;
  uploadError: any; // Update this type based on your error handling
};

const usePhoto = (): uploadProps => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<any>(null);

  const uploadImage = async (file: File): Promise<string> => {
    setUploading(true);
    setUploadError(null);

    try {
      // Create a reference to the storage location
      const storageRef = ref(storage);

      // Generate a unique filename for the image
      const filename = `${Date.now()}_${file.name}`;

      // Create a reference to the file
      const imageRef = storageRef.child(filename);

      // Upload the file to Firebase Storage
      await imageRef.put(file);

      // Get the download URL for the uploaded image
      const downloadURL = await imageRef.getDownloadURL();

      return downloadURL;
    } catch (error) {
      setUploadError(error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, uploadError };
};

export default usePhoto;

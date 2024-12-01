import imageCompression from "browser-image-compression";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import React, { useContext, useState } from "react";
import { db, storage } from "../config/firebase";
import useFirestore from "./useFirestore";
import { doc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { download } from "ionicons/icons";

const useUploadKYCFiles = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    updateData,
    loading: isLoading,
    error: eventError,
  } = useFirestore("kyc_sessions");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(true);

  // const [docUrl, setDocUrl] = useState<string | null>(null);
  // const [docPath, setDocPath] = useState<string | null>(null);

  const kyc_session_id = currentUser?.data.kyc_session_id;
  const user_id = currentUser?.uid;

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
      setError(error);
      console.error("Error compressing image:", error);
      throw error;
    }
  };

  /**
   *
   * @param file a file that will be uploaded
   * @param filename the name of the file
   */
  const uploadDocuments = async (
    file: File,
    filename: string
    // newData: any
  ) => {
    try {
      setIsUploading(true);

      // const compressedFile = await compressImage(file);
      const imageFile = file;

      // console.log("path: ", imagePath);
      // const collectionRef = collection(db, "events");
      // const dataSnapshot = await addData(newData);

      // console.log(dataSnapshot);

      if (imageFile) {
        const storageRef = ref(storage, `profiles/${user_id}/kyc_documents`);
        const imageRef = ref(storageRef, `${filename}`);

        const snapshot = await uploadBytes(imageRef, imageFile);
        console.log("Uploaded a blob or file! ", snapshot);
        // Upload completed successfully, get download URL
        const downloadUrl = await getDownloadURL(snapshot.ref);
        const imagePath = snapshot.metadata.fullPath;

        if (filename === "Primary ID") {
          updateDocument({
            primary_id_path: imagePath,
            primary_id_url: downloadUrl,
          });
        }
        if (filename === "Secondary ID") {
          updateDocument({
            secondary_id_path: imagePath,
            secondary_id_url: downloadUrl,
          });
        }
        if (filename === "Supporting Document") {
          updateDocument({
            supporting_document_path: imagePath,
            supporting_document_url: downloadUrl,
          });
        }

        return {
          imagePath: imagePath,
          imageUrl: downloadUrl,
        };
      }
      // await updateData(kyc_session_id, {
      //   // documentsPath: imagePath,
      //   // documentsUrl: downloadUrl,
      //   ...newData,
      //   updatedAt: serverTimestamp(),
      // });

      console.log("Image Uploaded successfully!");
    } catch (err) {
      deleteImage();
      setError(err);
      console.error("Error Creating Event: ", err);
      throw err;
    } finally {
      setIsUploading(false);
      setLoading(false);
    }
  };

  async function updateDocument(newData: object) {
    const result = await updateData(kyc_session_id!, newData);
    return result;
  }

  const deleteImage = async () => {
    if (imagePath) {
      console.log("Aborting upload...");

      try {
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
        setImageUrl(null);
        setImagePath(null);
        console.log("Image deleted successfully");
      } catch (err) {
        setError(err);
        console.error("Error deleting image:", err);
        throw err;
      }
    }
  };

  return {
    uploadDocuments,
    updateDocument,
    loading,
    error,
    isUploading,
    imageUrl,
    imagePath,
  };
};

export default useUploadKYCFiles;

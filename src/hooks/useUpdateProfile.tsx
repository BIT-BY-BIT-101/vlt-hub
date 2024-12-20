import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db, storage } from "../config/firebase";
import imageCompression from "browser-image-compression";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { AuthContext } from "../context/AuthContext";

const useUpdateProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(true);

  const userId = currentUser?.uid;

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
   * @param id the id of the event or profile
   */
  const updateProfileImage = async (file: File, id: string) => {
    try {
      setIsUploading(true);

      const compressedFile = await compressImage(file);

      const storageRef = ref(storage, `profiles/${userId}/image`);
      const imageRef = ref(storageRef, `profile_picture`);

      // const snapshot = await uploadString(imageRef, file, "data_url");
      // const snapshot = await uploadBytes(imageRef, file);
      const snapshot = await uploadBytes(imageRef, compressedFile);
      console.log("Uploaded a blob or file! ", snapshot);
      // Upload completed successfully, get download URL
      const downloadUrl = await getDownloadURL(snapshot.ref);
      const imagePath = snapshot.metadata.fullPath;
      console.log("path: ", imagePath);
      const docRef = doc(db, "profiles", id);
      await updateDoc(docRef, {
        photoURL: downloadUrl,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      async () => {
        await deleteImage();
        setError(err);
      };
      console.error("Error: ", err);
      throw err;
    } finally {
      setIsUploading(false);
      setLoading(false);
    }
  };

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
        console.error("Error deleting image:", err);
      }
    }
  };

  return {
    updateProfileImage,
    loading,
    error,
    isUploading,
    imageUrl,
    imagePath,
  };
};

export default useUpdateProfile;

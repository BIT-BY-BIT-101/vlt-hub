import imageCompression from "browser-image-compression";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import React, { useContext, useState } from "react";
import { storage, db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";

const useUpdateEvent = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(true);

  const id = currentUser?.uid;

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
   * @param data the data of the event
   * @param id the id of the event or profile
   */
  const updateData = async (
    file: File,
    filename: string,
    data: any,
    id: string
  ) => {
    try {
      setIsUploading(true);

      const compressedFile = await compressImage(file);

      const storageRef = ref(storage, `events/${id}/images`);
      const imageRef = ref(storageRef, `${filename}`);

      // const snapshot = await uploadString(imageRef, file, "data_url");
      // const snapshot = await uploadBytes(imageRef, file);
      const snapshot = await uploadBytes(imageRef, compressedFile);
      console.log("Uploaded a blob or file! ", snapshot);
      // Upload completed successfully, get download URL
      const downloadUrl = await getDownloadURL(snapshot.ref);
      const imagePath = snapshot.metadata.fullPath;
      console.log("path: ", imagePath);
      const docRef = doc(db, "events", id);
      await updateDoc(docRef, {
        ...data,
        imagePath: imagePath,
        imageUrl: downloadUrl,
        updatedAt: serverTimestamp(),
      });

      return {
        imagePath: imagePath,
        imageUrl: downloadUrl,
      };
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
    setLoading(true);
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
        throw err;
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    updateData,
    loading,
    error,
    isUploading,
    imageUrl,
    imagePath,
  };
};

export default useUpdateEvent;

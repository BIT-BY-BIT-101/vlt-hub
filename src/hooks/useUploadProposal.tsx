import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import useFirestore from "./useFirestore";
import { set } from "react-hook-form";

const useUploadProposal = (id: string) => {
  const {
    updateData: updateEvent,
    loading: updatingEvent,
    error: errorUpdatingEvent,
  } = useFirestore("events");
  // const {
  //   updateData: updateRequest,
  //   loading: updatingRequest,
  //   error: errorUpdatingRequest,
  // } = useFirestore("events");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [error, setError] = useState(null);

  const uploadProposal = async (file: File) => {
    if (!file || (file.type !== "application/pdf" && file == null)) {
      setError("Please upload a valid PDF file.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const storage = getStorage();
      const fileRef = ref(storage, `/events/${id}/documents/Proposal.pdf`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (uploadError) => {
          setError(uploadError.message);
          setIsUploading(false);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const fullPath = uploadTask.snapshot.ref.fullPath;

          await updateEvent(id, {
            proposal_url: url,
            proposal_path: fullPath,
            status: "for confirmation",
          });

          // await updateRequest(id, {
          //   status: "for confirmation",
          //   is_transaction_complete: true,
          // });
          setDownloadURL(url);
          setIsUploading(false);
        }
      );
    } catch (err) {
      console.error(err);

      setError(err);
      setIsUploading(false);
      throw err;
    }
  };

  return { uploadProposal, uploadProgress, isUploading, downloadURL, error };
};

export default useUploadProposal;

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import React, { useState } from "react";
import useFirestore from "./useFirestore";

const useUploadFilledProposal = (id: string) => {
  //   const {
  //     updateData: updateEvent,
  //     loading: updatingEvent,
  //     error: errorUpdatingEvent,
  //   } = useFirestore("events");
  const {
    updateData: updateRequest,
    loading: updatingRequest,
    error: errorUpdatingRequest,
  } = useFirestore("requests");
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

          await updateRequest(id, {
            is_transaction_complete: false,
            request_proposal_url: url,
            request_proposal_path: fullPath,
            status: "for approval",
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

export default useUploadFilledProposal;

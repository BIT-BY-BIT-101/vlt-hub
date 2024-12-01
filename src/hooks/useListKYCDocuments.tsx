import { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { FirebaseError } from "firebase/app";

const useListKYCDocuments = (kyc_session_id: string) => {
  const [documents, setDocuments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKYCDocuments = async () => {
      try {
        const storage = getStorage(); // Ensure Firebase is initialized
        const folderRef = ref(
          storage,
          `profiles/${kyc_session_id}/kyc_documents`
        );
        const result = await listAll(folderRef);

        const urls = await Promise.all(
          result.items.map((item) => getDownloadURL(item))
        );

        setDocuments(urls);
      } catch (err: FirebaseError | any) {
        console.error("Error fetching KYC documents:", err);

        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchKYCDocuments();
  }, [kyc_session_id]);

  return { documents, loading, error };
};

export default useListKYCDocuments;

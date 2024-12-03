import { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { storage } from "../config/firebase";

const useListKYCDocuments = (host_id: string) => {
  const [documents, setDocuments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKYCDocuments = async () => {
      try {
        const storage = getStorage(); // Ensure Firebase is initialized
        const folderRef = ref(storage, `profiles/${host_id}/kyc_documents`);
        const result = await listAll(folderRef);

        // console.log(result);

        const documents = await Promise.all(
          result.items.map(async (item) => ({
            url: await getDownloadURL(item),
            name: item.name,
          }))
        );
        console.log("KYC documents:", documents);

        setDocuments(documents);
      } catch (err: FirebaseError | any) {
        console.error("Error fetching KYC documents:", err);
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchKYCDocuments();
  }, [host_id]);

  return { documents, loading, error };
};

export default useListKYCDocuments;

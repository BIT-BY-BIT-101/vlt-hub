import React from "react";

const useDeleteImage = () => {
  const deleteImage = async () => {
    if (imageName) {
      try {
        const imageRef = ref(storage, imageName);
        await deleteObject(imageRef);
        setImageUrl(null);
        setImageName(null);
        console.log("Image deleted successfully");
      } catch (err) {
        console.error("Error deleting image:", err);
      }
    }
  };
};

export default useDeleteImage;

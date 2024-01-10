import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import React, { useState } from "react";

type UserPhoto = {
  filepath: string;
  webviewPath?: string;
};

const useCamera = (eventCoverName?: string) => {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      allowEditing: false,
      quality: 90,
    });
    // const fileName = eventCoverName + ".jpeg";
    const fileName = Date.now() + ".jpeg";
    // const newPhotos = photo.webPath;
    const newPhotos = [
      {
        filepath: fileName,
        webviewPath: photo.webPath,
      },
    ];

    setPhotos(newPhotos);
    console.log(newPhotos);
  };
  console.log(photos);

  return {
    photos,
    takePhoto,
  };
};

export default useCamera;

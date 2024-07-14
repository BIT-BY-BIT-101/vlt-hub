import React from "react";

const useGetChatRoom = () => {
  const docRef = doc(db, "chats", "SF");
  const docSnap = await getDoc(docRef);
};

export default useGetChatRoom;

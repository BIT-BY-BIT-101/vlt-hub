// src/contexts/UpdateDataContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context data
interface UpdateDataContextType {
  data: any; // You can define a more specific type here
  setData: (data: any) => void; // Define a function to set data
}

// Create the context
export const UpdateDataContext = createContext<UpdateDataContextType>({
  data: null,
  setData: () => {},
});

// Create a provider component
export const UpdateDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<any>(null); // Initialize with null or some default state

  console.log("Data: ", data);

  return (
    <UpdateDataContext.Provider value={{ data, setData }}>
      {children}
    </UpdateDataContext.Provider>
  );
};

// Create a custom hook to use the context
export const useUpdateData = () => {
  const context = useContext(UpdateDataContext);
  if (!context) {
    throw new Error("useUpdateData must be used within an UpdateDataProvider");
  }
  return context;
};

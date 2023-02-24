import React, { createContext, useState, useEffect, useContext } from "react";

interface ModalContextData {
  index: number;
  id: string
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);
export const ModalProvider: React.FC<{
  children: React.ReactNode;
  index: number;
  id: string,
}> = ({ children, index, id, }) => {
  return (
    <ModalContext.Provider
      value={{
        id,
        index,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export function useModalIndex(): ModalContextData {
  const context = useContext(ModalContext);

  return context;
}

'use client';

import React, { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast, ToastOptions, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastContextType {
   createToast: (message: string, type?: TypeOptions, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const createToast = (message: string, type: TypeOptions = "success", options?: ToastOptions) => {
    toast(message, { type, ...options });
  };

  return (
    <ToastContext.Provider value={{ createToast }}>
      {children}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

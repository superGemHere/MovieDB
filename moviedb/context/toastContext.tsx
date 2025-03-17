'use client';

import React, { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast, ToastOptions, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the context type
interface ToastContextType {
   createToast: (message: string, type?: TypeOptions, options?: ToastOptions) => void;
}

// Create the context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

// Create the provider component
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const createToast = (message: string, type: TypeOptions = "success", options?: ToastOptions) => {
    toast(message, { type, ...options });
  };

  return (
    <ToastContext.Provider value={{ createToast }}>
      {children}
      {/* Global Toast Container */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </ToastContext.Provider>
  );
};

// Hook to use the context
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

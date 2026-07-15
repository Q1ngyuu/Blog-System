"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "12px",
          background: "#1f2937",
          color: "#f9fafb",
          fontSize: "14px",
          fontWeight: 500,
          padding: "12px 18px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "#f9fafb",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#f9fafb",
          },
        },
      }}
    />
  );
}

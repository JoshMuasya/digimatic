"use client"

import { Toaster } from "react-hot-toast"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background:
            "linear-gradient(135deg, var(--primary), var(--secondary), var(--primary))",
          color: "var(--foreground)",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-elegant), var(--shadow-glow)",
          padding: "12px 16px",
        },
        success: {
          iconTheme: {
            primary: "var(--secondary)",
            secondary: "var(--foreground)",
          },
        },
        error: {
          iconTheme: {
            primary: "var(--destructive)",
            secondary: "var(--foreground)",
          },
        },
      }}
    />
  )
}

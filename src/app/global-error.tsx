"use client";

import { useEffect } from "react";

// global-error replaces the root layout, so it must include <html> and <body>
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: "1rem",
          padding: "1rem",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          Something went wrong
        </h2>
        <p style={{ color: "#6b7280", maxWidth: "400px" }}>
          A critical error occurred. Please refresh the page.
        </p>
        {error.digest && (
          <p
            style={{
              fontSize: "0.75rem",
              color: "#9ca3af",
              fontFamily: "monospace",
            }}
          >
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          style={{
            padding: "0.5rem 1.25rem",
            borderRadius: "0.375rem",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}

"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error boundary caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main>
          <h1>Something went wrong</h1>
          <p>We encountered an unexpected error. Please try again.</p>
          <button onClick={reset}>Try again</button>
        </main>
      </body>
    </html>
  );
}

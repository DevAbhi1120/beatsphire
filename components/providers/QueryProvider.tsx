"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // npm i @tanstack/react-query-devtools for dev vibes
import { ErrorBoundary } from "react-error-boundary"; // npm i react-error-boundary
import { Music } from "lucide-react";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-red-900 to-pink-900 text-white rounded-xl">
      <Music className="h-12 w-12 mb-4 opacity-70" />
      <h2 className="text-xl font-bold mb-2">Vibe Echo Disrupted</h2>
      <p className="text-gray-300 mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-white text-red-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100"
      >
        Retry the Rhythm
      </button>
    </div>
  );
}

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5min—scales for emotional data freshness
            cacheTime: 10 * 60 * 1000, // 10min eviction
            retry: 2, // Graceful for network "skips"
            refetchOnWindowFocus: false, // No auto-refetch on tab switch—user-controlled vibes
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {children}
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

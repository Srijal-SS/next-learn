"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorBoundary({
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
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Database Connection Failed</h2>
      <p className="text-neutral-400 max-w-md mb-8">
        We couldn't connect to Supabase. Please ensure your <code className="text-indigo-400 bg-neutral-900 px-1 py-0.5 rounded">.env.local</code> is configured correctly with <code className="text-indigo-400 bg-neutral-900 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="text-indigo-400 bg-neutral-900 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
      </p>
      
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

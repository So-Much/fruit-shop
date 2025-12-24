'use client';

import React from 'react';

interface ErrorDisplayProps {
  error: Error | string;
  reset?: () => void;
  title?: string;
}

export default function ErrorDisplay({ 
  error, 
  reset, 
  title = 'Đã xảy ra lỗi' 
}: ErrorDisplayProps) {
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-black">
      <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <svg
              className="h-6 w-6 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {errorMessage}
            </p>
          </div>

          {reset && (
            <button
              onClick={reset}
              className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Thử lại
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

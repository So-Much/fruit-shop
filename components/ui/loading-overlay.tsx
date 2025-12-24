'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import Loading from './loading';

interface LoadingOverlayContextType {
  show: () => void;
  hide: () => void;
  isLoading: boolean;
}

const LoadingOverlayContext = createContext<LoadingOverlayContextType | undefined>(undefined);

export function LoadingOverlayProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const show = () => setIsLoading(true);
  const hide = () => setIsLoading(false);

  return (
    <LoadingOverlayContext.Provider value={{ show, hide, isLoading }}>
      {children}
      {isLoading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="loading-overlay-title"
        >
          <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
            <Loading size="lg" />
            <p id="loading-overlay-title" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Đang tải...
            </p>
          </div>
        </div>
      )}
    </LoadingOverlayContext.Provider>
  );
}

export function useLoadingOverlay() {
  const context = useContext(LoadingOverlayContext);
  if (context === undefined) {
    throw new Error('useLoadingOverlay must be used within a LoadingOverlayProvider');
  }
  return context;
}

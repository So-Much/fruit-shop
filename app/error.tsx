'use client';

import { useEffect } from 'react';
import ErrorDisplay from '@/components/error/error-display';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return <ErrorDisplay error={error} reset={reset} title="Có lỗi xảy ra" />;
}

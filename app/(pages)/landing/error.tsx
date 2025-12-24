'use client';

import { useEffect } from 'react';
import ErrorDisplay from '@/components/error/error-display';

export default function LandingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Landing page error:', error);
  }, [error]);

  return <ErrorDisplay error={error} reset={reset} title="Lỗi khi tải trang chủ" />;
}

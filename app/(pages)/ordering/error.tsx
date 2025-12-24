'use client';

import { useEffect } from 'react';
import ErrorDisplay from '@/components/error/error-display';

export default function OrderingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Ordering page error:', error);
  }, [error]);

  return <ErrorDisplay error={error} reset={reset} title="Lỗi khi tải trang đặt hàng" />;
}

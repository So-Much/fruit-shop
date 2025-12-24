import Loading from '@/components/ui/loading';

export default function OrderingLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="text-center">
        <Loading size="lg" />
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          Đang tải sản phẩm...
        </p>
      </div>
    </div>
  );
}

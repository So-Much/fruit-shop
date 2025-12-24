import Loading from '@/components/ui/loading';

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <Loading size="lg" />
    </div>
  );
}

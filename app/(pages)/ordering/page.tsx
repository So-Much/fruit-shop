import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Đặt hàng - Fruit Shop',
  description: 'Đặt hàng trái cây tươi ngon tại Fruit Shop',
};

export default function OrderingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/landing"
              className="text-2xl font-bold text-zinc-900 dark:text-zinc-100"
            >
              🍎 Fruit Shop
            </Link>
            <Link
              href="/landing"
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Về trang chủ
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-zinc-50 dark:bg-black">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Đặt hàng
            </h1>

            {/* Product Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Sample Product Cards */}
              {[
                { name: 'Táo đỏ', price: '45,000đ/kg', emoji: '🍎' },
                { name: 'Chuối', price: '25,000đ/kg', emoji: '🍌' },
                { name: 'Cam', price: '35,000đ/kg', emoji: '🍊' },
                { name: 'Dưa hấu', price: '15,000đ/kg', emoji: '🍉' },
                { name: 'Dứa', price: '30,000đ/quả', emoji: '🍍' },
                { name: 'Nho', price: '80,000đ/kg', emoji: '🍇' },
              ].map((product, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="mb-4 text-center text-5xl">{product.emoji}</div>
                  <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {product.name}
                  </h3>
                  <p className="mb-4 text-lg font-medium text-green-600 dark:text-green-400">
                    {product.price}
                  </p>
                  <button className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
                    Thêm vào giỏ
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary Placeholder */}
            <div className="mt-12 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                Giỏ hàng
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Giỏ hàng của bạn đang trống. Hãy thêm sản phẩm để tiếp tục.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="container mx-auto px-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>&copy; 2024 Fruit Shop. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}

import Link from 'next/link';

interface Product {
  name: string;
  price: string;
  originalPrice?: string;
  emoji: string;
  badge?: string;
  discount?: string;
}

const products: Product[] = [
  {
    name: 'Fresh Apple Box',
    price: '$24.99',
    originalPrice: '$29.99',
    emoji: '🍎',
    badge: 'Best Seller',
    discount: '17% OFF',
  },
  {
    name: 'Tropical Combo',
    price: '$39.99',
    originalPrice: '$49.99',
    emoji: '🥭',
    badge: 'Popular',
    discount: '20% OFF',
  },
  {
    name: 'Berry Mix Deluxe',
    price: '$34.99',
    emoji: '🍓',
    badge: 'Featured',
  },
  {
    name: 'Citrus Family Pack',
    price: '$29.99',
    originalPrice: '$34.99',
    emoji: '🍊',
    badge: 'New',
    discount: '15% OFF',
  },
];

export default function BestSellers() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Best Sellers & Featured Combos
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Most loved by our customers - perfect for trying something new
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:scale-105 cursor-pointer"
            >
              {product.badge && (
                <div className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                  {product.badge}
                </div>
              )}
              {product.discount && (
                <div className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                  {product.discount}
                </div>
              )}
              
              <div className="mb-4 flex h-48 items-center justify-center rounded-xl bg-gradient-to-br from-green-50 to-orange-50 text-7xl">
                {product.emoji}
              </div>
              
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{product.name}</h3>
              
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              
              <button className="w-full rounded-full bg-gradient-to-r from-green-600 to-green-700 py-3 text-sm font-semibold text-white transition-all hover:from-green-700 hover:to-green-800 hover:shadow-lg">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/ordering"
            className="inline-block rounded-full border-2 border-green-600 bg-white px-8 py-3 text-lg font-semibold text-green-600 transition-all hover:bg-green-600 hover:text-white"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

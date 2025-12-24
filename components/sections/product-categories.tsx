import Link from 'next/link';

interface Category {
  name: string;
  description: string;
  emoji: string;
  href: string;
  gradient: string;
}

const categories: Category[] = [
  {
    name: 'Local Fruits',
    description: 'Fresh fruits from local farms',
    emoji: '🍎',
    href: '/ordering?category=local',
    gradient: 'from-red-400 to-red-500',
  },
  {
    name: 'Imported Fruits',
    description: 'Premium imported selections',
    emoji: '🥭',
    href: '/ordering?category=imported',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    name: 'Family Combos',
    description: 'Perfect packages for families',
    emoji: '📦',
    href: '/ordering?category=combos',
    gradient: 'from-green-400 to-green-600',
  },
  {
    name: 'Seasonal Fruits',
    description: 'Best fruits in season now',
    emoji: '🍊',
    href: '/ordering?category=seasonal',
    gradient: 'from-orange-400 to-orange-600',
  },
];

export default function ProductCategories() {
  return (
    <section id="combos" className="py-20 bg-gradient-to-b from-white to-green-50/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explore our wide range of fresh fruits organized by category
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.gradient} p-8 text-center shadow-lg transition-all hover:shadow-2xl hover:scale-105 cursor-pointer`}
            >
              <div className="mb-4 text-6xl">{category.emoji}</div>
              <h3 className="mb-2 text-2xl font-bold text-white">{category.name}</h3>
              <p className="text-white/90">{category.description}</p>
              <div className="mt-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all group-hover:bg-white/30">
                Shop Now →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

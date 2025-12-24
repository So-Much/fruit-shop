import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Fresh Fruits Every Day –{' '}
              <span className="bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                Delivered to Your Door
              </span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
              Carefully selected fresh fruits from trusted farms, no preservatives. 
              Experience the natural goodness delivered right to your doorstep.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/ordering"
                className="rounded-full bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-green-500/30 transition-all hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105"
              >
                Shop Now
              </Link>
              <Link
                href="/ordering"
                className="rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-700 transition-all hover:border-green-600 hover:bg-green-50 hover:text-green-700"
              >
                View Products
              </Link>
            </div>
          </div>

          {/* Right Image Placeholder */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-green-400/20 to-orange-400/20 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  <div className="text-6xl">🍎</div>
                  <div className="text-6xl">🍌</div>
                  <div className="text-6xl">🍊</div>
                  <div className="text-6xl">🍇</div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-yellow-400/30 blur-3xl" aria-hidden="true" />
              <div className="absolute -bottom-4 -left-4 h-40 w-40 rounded-full bg-orange-400/30 blur-3xl" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

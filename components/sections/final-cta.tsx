import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-green-600 via-green-500 to-orange-500">
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-yellow-400/20 blur-3xl" aria-hidden="true" />
      
      <div className="container relative mx-auto px-4 text-center">
        <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          Eat Clean – Live Healthy Every Day
        </h2>
        <p className="mb-8 mx-auto max-w-2xl text-xl text-white/90">
          Start your journey to better health with fresh, natural fruits delivered to your door
        </p>
        <Link
          href="/ordering"
          className="inline-block rounded-full bg-white px-10 py-4 text-lg font-bold text-green-600 shadow-2xl transition-all hover:scale-105 hover:shadow-3xl"
        >
          Order Today
        </Link>
      </div>
    </section>
  );
}

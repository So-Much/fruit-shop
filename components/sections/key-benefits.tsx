interface Benefit {
  icon: string;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: '🍎',
    title: 'Daily Freshness',
    description: 'Sourced daily from local farms, ensuring maximum freshness and nutrition',
  },
  {
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Get your order delivered within 2 hours to your doorstep',
  },
  {
    icon: '🌱',
    title: 'Clear Origin & Quality Control',
    description: 'Traceable sources with strict quality standards and certifications',
  },
  {
    icon: '💰',
    title: 'Affordable Prices',
    description: 'Best value combos and competitive prices for quality produce',
  },
];

export default function KeyBenefits() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Why Choose Farm Fresh?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            We are committed to bringing you the freshest, highest quality fruits every single day
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-green-50/50 p-8 text-center shadow-sm transition-all hover:shadow-xl hover:scale-105 cursor-pointer"
            >
              <div className="mb-4 text-5xl">{benefit.icon}</div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

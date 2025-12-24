import Link from 'next/link';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Choose Products',
    description: 'Browse our wide selection and add items to your cart',
    icon: '🛒',
  },
  {
    number: '02',
    title: 'Place Order Online',
    description: 'Complete your order with just a few clicks',
    icon: '📱',
  },
  {
    number: '03',
    title: 'Home Delivery',
    description: 'Get your fresh fruits delivered within 2 hours',
    icon: '🚚',
  },
  {
    number: '04',
    title: 'Flexible Payment',
    description: 'Pay with cash, card, or digital wallet',
    icon: '💳',
  },
];

export default function OrderingProcess() {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Simple Ordering Process
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Getting fresh fruits has never been easier - just 4 simple steps
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-[60%] top-12 hidden h-0.5 w-full bg-gradient-to-r from-green-400 to-orange-400 lg:block" />
              )}
              
              <div className="relative z-10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-3xl shadow-lg">
                {step.icon}
              </div>
              
              <div className="mb-2 text-sm font-bold text-green-600">{step.number}</div>
              
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h3>
              
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-lg text-gray-700">
            Ready to get started?
          </p>
          <Link
            href="/ordering"
            className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 text-lg font-semibold text-white shadow-xl shadow-orange-500/30 transition-all hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-105"
          >
            Start Ordering Now
          </Link>
        </div>
      </div>
    </section>
  );
}

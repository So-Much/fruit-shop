interface Review {
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Amazing quality! The fruits are always fresh and delivered on time. Highly recommended!',
    avatar: '👩',
  },
  {
    name: 'Michael Chen',
    rating: 5,
    comment: 'Best fruit delivery service in town. The family combo is perfect for us.',
    avatar: '👨',
  },
  {
    name: 'Emily Davis',
    rating: 5,
    comment: 'Love how fresh everything is. The customer service is excellent too!',
    avatar: '👩‍🦱',
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-green-50/30 p-8 shadow-sm transition-all hover:shadow-xl hover:scale-105"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="mb-6 text-gray-700 italic">"{review.comment}"</p>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-500 text-2xl">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">Verified Customer</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

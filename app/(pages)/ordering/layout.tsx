import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Order Fresh Fruits Online - Shop Now',
  description:
    'Browse and order fresh fruits online. Local fruits, imported selections, family combos, and seasonal fruits. Add to cart and get fast delivery within 2 hours.',
  url: '/ordering',
  image: '/og-image.jpg',
  type: 'website',
});

export default function OrderingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


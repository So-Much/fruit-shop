import { Metadata } from 'next';
import Header from '@/components/layout/header';
import HeroSection from '@/components/sections/hero-section';
import KeyBenefits from '@/components/sections/key-benefits';
import ProductCategories from '@/components/sections/product-categories';
import BestSellers from '@/components/sections/best-sellers';
import OrderingProcess from '@/components/sections/ordering-process';
import CustomerReviews from '@/components/sections/customer-reviews';
import FinalCTA from '@/components/sections/final-cta';
import Footer from '@/components/layout/footer';
import StructuredData from '@/components/seo/structured-data';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Fresh Fruits Every Day Delivered to Your Door',
  description:
    'Carefully selected fresh fruits from trusted farms, no preservatives. Fast delivery within 2 hours. Shop local and imported fruits, family combos, and seasonal selections. Order today for a healthier tomorrow!',
  url: '/landing',
  image: '/og-image.jpg',
});

export default function LandingPage() {
  return (
    <>
      <StructuredData
        type="Store"
        data={{
          '@type': 'Store',
          name: 'Farm Fresh',
          image: 'https://pick-your-basket.netlify.app/og-image.jpg',
          url: 'https://pick-your-basket.netlify.app/landing',
          description:
            'Online fresh fruit store delivering carefully selected fruits from trusted farms. Fast delivery within 2 hours.',
        }}
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <KeyBenefits />
          <ProductCategories />
          <BestSellers />
          <OrderingProcess />
          <CustomerReviews />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}

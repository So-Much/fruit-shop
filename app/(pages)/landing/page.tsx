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

export const metadata: Metadata = {
  title: 'Farm Fresh - Fresh Fruits Every Day Delivered to Your Door',
  description: 'Carefully selected fresh fruits from trusted farms, no preservatives. Fast delivery within 2 hours.',
};

export default function LandingPage() {
  return (
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
  );
}

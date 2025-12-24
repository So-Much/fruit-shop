'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { Toaster } from 'sonner';
import ProductList from '@/components/ordering/product-list';
import Cart from '@/components/ordering/cart';
import GramInputModal from '@/components/ordering/gram-input-modal';
import GlobalSummary from '@/components/ordering/global-summary';
import { useCartStore } from '@/store/cart-store';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function OrderingPage() {
  const { carts, openModal } = useCartStore();
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeData = active.data.current;
    
    if (activeData?.type === 'product') {
      setActiveProduct(activeData.product as Product);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveProduct(null);

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type === 'product' && overData?.type === 'cart') {
      const product = activeData.product as Product;
      const cartId = overData.cartId as string;
      openModal(cartId, product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Toaster position="top-right" richColors />
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/landing" className="text-2xl font-bold text-green-700 hover:text-green-800 transition-colors">
              🍎 Farm Fresh
            </Link>
            <Link
              href="/landing"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              Back to Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <DndContext 
        sensors={sensors} 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Fresh Fruits</h1>
            <p className="text-gray-600">Drag fruits to your carts and specify the amount in grams</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Product List */}
            <div className="lg:col-span-2">
              <ProductList />
            </div>

            {/* Right Column - Global Summary */}
            <div>
              <GlobalSummary />
            </div>
          </div>

          {/* Shopping Carts */}
          <div className="mt-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Your Shopping Carts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {carts.map((cart) => (
                <Cart key={cart.id} cart={cart} />
              ))}
            </div>
          </div>
        </main>

        {/* Drag Overlay - Smooth drag preview that follows cursor */}
        <DragOverlay dropAnimation={null}>
          {activeProduct ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0.9, rotate: -2 }}
              animate={{ scale: 1.05, opacity: 1, rotate: -3 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              className="flex items-center gap-4 rounded-lg border-2 border-green-500 bg-white p-4 shadow-2xl cursor-grabbing"
              style={{ 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                transform: 'rotate(-3deg)',
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-green-200 text-3xl">
                {activeProduct.image}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{activeProduct.name}</h3>
                <p className="text-sm text-gray-600">{formatCurrency(activeProduct.pricePerKg)}/kg</p>
              </div>
            </motion.div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>&copy; 2024 Farm Fresh. All rights reserved.</p>
        </div>
      </footer>

      {/* Modal */}
      <GramInputModal />
    </div>
  );
}

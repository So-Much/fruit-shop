'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DndContext, DragEndEvent, DragStartEvent, DragOverEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { Toaster } from 'sonner';
import ProductList from '@/components/ordering/product-list';
import BasketsDropZone from '@/components/ordering/baskets-drop-zone';
import OrderSummary from '@/components/ordering/order-summary';
import QuickGramInput from '@/components/ordering/quick-gram-input';
import { useCartStore } from '@/store/cart-store';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function OrderingPage() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isOverDropZone, setIsOverDropZone] = useState(false);

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

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    const overData = over?.data.current;
    setIsOverDropZone(overData?.type === 'drop-zone');
  };

  const { openModal } = useCartStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveProduct(null);
    setIsOverDropZone(false);

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    // Drop on baskets zone - open modal
    if (activeData?.type === 'product' && overData?.type === 'drop-zone') {
      const product = activeData.product as Product;
      openModal('', product); // cartId not needed for new flow
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
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Fresh Fruits</h1>
            <p className="text-gray-600">Drag fruits to the center, enter grams, and press Enter</p>
          </div>

          {/* 3-Column Layout */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* LEFT COLUMN - Products (4 columns) */}
            <div className="lg:col-span-4">
              <ProductList />
            </div>

            {/* CENTER COLUMN - Baskets Drop Zone (5 columns) */}
            <div className="lg:col-span-5">
              <BasketsDropZone isOver={isOverDropZone} />
            </div>

            {/* RIGHT COLUMN - Summary (3 columns) */}
            <div className="lg:col-span-3">
              <OrderSummary />
            </div>
          </div>
        </main>

        {/* Drag Overlay - Full screen overlay with large image */}
        <DragOverlay dropAnimation={null}>
          {activeProduct ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              {/* Semi-transparent backdrop */}
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
              
              {/* Large fruit image in center */}
              <div className="relative flex flex-col items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex h-48 w-48 items-center justify-center rounded-3xl bg-gradient-to-br from-green-100 to-green-200 text-9xl shadow-2xl border-4 border-green-400"
                  style={{ 
                    boxShadow: '0 25px 50px -12px rgba(34, 197, 94, 0.5)',
                  }}
                >
                  {activeProduct.image}
                </motion.div>
                
                {/* Small description below */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 rounded-xl bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg border border-green-200"
                >
                  <p className="text-sm font-semibold text-gray-900">{activeProduct.name}</p>
                  <p className="text-xs text-gray-600">{formatCurrency(activeProduct.pricePerKg)}/kg</p>
                </motion.div>
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

      {/* Quick Gram Input Modal */}
      <QuickGramInput />
    </div>
  );
}

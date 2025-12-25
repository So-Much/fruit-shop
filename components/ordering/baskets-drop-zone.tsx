'use client';

import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBasket } from 'lucide-react';
import Basket from './basket';
import { useCartStore } from '@/store/cart-store';
import { cn } from '@/lib/utils';

interface BasketsDropZoneProps {
  isOver: boolean;
}

export default function BasketsDropZone({ isOver }: BasketsDropZoneProps) {
  const { carts: baskets } = useCartStore();
  const { setNodeRef } = useDroppable({
    id: 'baskets-drop-zone',
    data: {
      type: 'drop-zone',
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'relative min-h-[600px] rounded-2xl border-2 border-dashed bg-gradient-to-b from-gray-50 to-green-50/30 p-6 transition-all duration-300',
        isOver
          ? 'border-green-500 bg-green-50 shadow-lg scale-[1.02]'
          : 'border-gray-300 hover:border-gray-400'
      )}
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
          <ShoppingBasket className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Your Baskets</h2>
          <p className="text-sm text-gray-600">Drop fruits here to add</p>
        </div>
      </div>

      {/* Drop Hint */}
      <AnimatePresence>
        {isOver && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 rounded-lg bg-green-100 p-4 text-center"
          >
            <p className="font-semibold text-green-700">Drop to add</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Baskets List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {baskets.map((basket, index) => (
            <motion.div
              key={basket.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <Basket basket={basket} />
            </motion.div>
          ))}
        </AnimatePresence>

        {baskets.length === 0 && (
          <div className="flex h-32 items-center justify-center text-gray-400">
            <p className="text-sm">No baskets yet. Drop a fruit to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
}


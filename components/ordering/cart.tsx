'use client';

import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import { Cart as CartType } from '@/types';
import { useCartStore } from '@/store/cart-store';
import { formatCurrency, formatGrams } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CartProps {
  cart: CartType;
}

const MAX_GRAMS = 1000;

export default function Cart({ cart }: CartProps) {
  const { removeItemFromCart, openModal } = useCartStore();

  const { setNodeRef, isOver } = useDroppable({
    id: cart.id,
    data: {
      type: 'cart',
      cartId: cart.id,
    },
  });

  const isNearLimit = cart.totalGrams > MAX_GRAMS * 0.8;
  const isOverLimit = cart.totalGrams > MAX_GRAMS;
  const remainingGrams = MAX_GRAMS - cart.totalGrams;

  return (
    <motion.div
      ref={setNodeRef}
      className={cn(
        'relative rounded-2xl border-2 bg-gradient-to-br from-white to-green-50/50 p-6 shadow-sm transition-all duration-300',
        isOver && 'border-green-500 bg-green-50 shadow-lg scale-105',
        isOverLimit && 'border-red-400 bg-red-50/50',
        !isOver && !isOverLimit && 'border-gray-200'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{cart.name}</h3>
          <p className="text-sm text-gray-600">
            {formatGrams(cart.totalGrams)} / {formatGrams(MAX_GRAMS)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-600">{formatCurrency(cart.totalPrice)}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 h-2 overflow-hidden rounded-full bg-gray-200">
        <motion.div
          className={cn(
            'h-full transition-colors duration-300',
            isOverLimit && 'bg-red-500',
            isNearLimit && !isOverLimit && 'bg-yellow-500',
            !isNearLimit && 'bg-green-500'
          )}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((cart.totalGrams / MAX_GRAMS) * 100, 100)}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
      </div>

      {/* Warning Message */}
      <AnimatePresence>
        {isOverLimit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700"
          >
            ⚠️ Exceeded {formatGrams(MAX_GRAMS)} limit by {formatGrams(cart.totalGrams - MAX_GRAMS)}
          </motion.div>
        )}
        {!isOverLimit && remainingGrams < MAX_GRAMS * 0.2 && remainingGrams > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 rounded-lg bg-yellow-100 p-3 text-sm text-yellow-700"
          >
            ⚠️ Only {formatGrams(remainingGrams)} remaining
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drop Zone Indicator */}
      {isOver && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-dashed border-green-500 bg-green-100/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-lg font-semibold text-green-700">Drop here to add</p>
        </motion.div>
      )}

      {/* Cart Items */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {cart.items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, x: -100 }}
              layout
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-50 to-green-100 text-2xl">
                {item.product.image}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.product.name}</p>
                <p className="text-sm text-gray-600">
                  {formatGrams(item.grams)} × {formatCurrency(item.product.pricePerKg)}/kg
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(item.price)}</p>
              </div>
              <button
                onClick={() => openModal(cart.id, item.product)}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-green-600"
                aria-label="Edit item"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  removeItemFromCart(cart.id, item.id);
                  toast.success('Removed from cart', {
                    description: `${item.product.name} removed`,
                  });
                }}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {cart.items.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8 text-center text-gray-400"
          >
            <p className="text-sm">Drop fruits here to add to cart</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}


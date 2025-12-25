'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Cart as BasketType } from '@/types';
import { useCartStore } from '@/store/cart-store';
import { formatCurrency, formatGrams } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface BasketProps {
  basket: BasketType;
}

const MAX_GRAMS = 1000;

export default function Basket({ basket }: BasketProps) {
  const { removeItemFromCart, openEditModal } = useCartStore();

  const isFull = basket.totalGrams >= MAX_GRAMS;
  const isNearLimit = basket.totalGrams > MAX_GRAMS * 0.8;
  const progressPercentage = Math.min((basket.totalGrams / MAX_GRAMS) * 100, 100);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        'relative rounded-2xl border-2 bg-gradient-to-br from-green-50/50 to-white p-5 shadow-lg transition-all duration-300 overflow-hidden',
        isFull ? 'border-green-500 bg-green-100/50' : 'border-green-200 hover:border-green-400 hover:shadow-xl'
      )}
    >
      {/* Basket Icon Background */}
      <div className="absolute top-2 right-2 text-8xl opacity-5 pointer-events-none">
        🧺
      </div>

      {/* Header with Basket Icon */}
      <div className="relative mb-4 flex items-start gap-4">
        {/* Basket Icon */}
        <div className={cn(
          'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-4xl shadow-md transition-all duration-300',
          isFull ? 'bg-green-500 text-white' : 'bg-gradient-to-br from-green-100 to-green-200'
        )}>
          🧺
        </div>

        {/* Basket Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{basket.name}</h3>
            {isFull && (
              <span className="flex-shrink-0 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                Full
              </span>
            )}
          </div>
          
          {/* Weight Info */}
          <div className="mb-2">
            <p className="text-xs text-gray-500 mb-1">Weight</p>
            <p className="text-sm font-semibold text-gray-700">
              <span className={cn(
                'font-bold',
                isFull && 'text-green-600',
                isNearLimit && !isFull && 'text-yellow-600',
                !isNearLimit && 'text-gray-900'
              )}>
                {formatGrams(basket.totalGrams)}
              </span>
              <span className="text-gray-400"> / {formatGrams(MAX_GRAMS)}</span>
            </p>
          </div>

          {/* Progress Bar */}
          <div className="h-2 overflow-hidden rounded-full bg-gray-200/80">
            <motion.div
              className={cn(
                'h-full transition-colors duration-300',
                isFull && 'bg-green-500',
                isNearLimit && !isFull && 'bg-yellow-500',
                !isNearLimit && 'bg-green-400'
              )}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            />
          </div>
        </div>

        {/* Price */}
        <div className="flex-shrink-0 text-right">
          <p className="text-xs text-gray-500 mb-1">Total</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(basket.totalPrice)}</p>
          <p className="text-xs text-gray-500 mt-1">
            {basket.items.length} {basket.items.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      {/* Items List */}
      <div className="relative space-y-2">
        <AnimatePresence mode="popLayout">
          {basket.items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              layout
              onClick={() => openEditModal(basket.id, item.id)}
              className="group relative flex items-center gap-3 rounded-xl border border-green-200/50 bg-white/80 backdrop-blur-sm p-3 cursor-pointer transition-all hover:border-green-400 hover:bg-green-50/80 hover:shadow-md active:scale-[0.98]"
            >
              {/* Fruit Icon */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-50 to-green-100 text-2xl shadow-sm">
                {item.product.image}
              </div>
              
              {/* Item Info */}
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900 mb-1">{item.product.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-600">
                    {formatGrams(item.grams)}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {formatCurrency(item.product.pricePerKg)}/kg
                  </span>
                </div>
              </div>
              
              {/* Price */}
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">{formatCurrency(item.price)}</p>
              </div>
              
              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeItemFromCart(basket.id, item.id);
                  toast.success('Removed', {
                    description: `${item.product.name} removed`,
                  });
                }}
                className="opacity-0 group-hover:opacity-100 rounded-lg p-1.5 text-gray-400 transition-all hover:bg-red-50 hover:text-red-600"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {basket.items.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <div className="mb-3 text-5xl opacity-30">🧺</div>
            <p className="text-sm font-medium text-gray-400">Empty basket</p>
            <p className="text-xs text-gray-400 mt-1">Drag fruits here to add</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}


'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Package, Scale, TrendingUp, Undo2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore } from '@/store/cart-store';
import { formatCurrency, formatGrams } from '@/lib/utils';

export default function OrderSummary() {
  const { carts: baskets, getGrandTotal, undo, canUndo } = useCartStore();
  const grandTotal = getGrandTotal();
  const totalGrams = baskets.reduce((sum, basket) => sum + basket.totalGrams, 0);
  const totalItems = baskets.reduce((sum, basket) => sum + basket.items.length, 0);
  const totalBaskets = baskets.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
        <p className="text-sm text-gray-600">Overview of your order</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Baskets</span>
          </div>
          <motion.span
            key={totalBaskets}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-lg font-bold text-gray-900"
          >
            {totalBaskets}
          </motion.span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Items</span>
          </div>
          <motion.span
            key={totalItems}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-lg font-bold text-gray-900"
          >
            {totalItems}
          </motion.span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
          <div className="flex items-center gap-3">
            <Scale className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Total Weight</span>
          </div>
          <motion.span
            key={totalGrams}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-lg font-bold text-gray-900"
          >
            {formatGrams(totalGrams)}
          </motion.span>
        </div>
      </div>

      {/* Basket Breakdown */}
      {baskets.length > 0 && (
        <div className="mb-6 space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">By Basket</h3>
          {baskets.map((basket) => (
            <div
              key={basket.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{basket.name}</p>
                <p className="text-xs text-gray-600">
                  {basket.items.length} {basket.items.length === 1 ? 'item' : 'items'} •{' '}
                  {formatGrams(basket.totalGrams)}
                </p>
              </div>
              <p className="text-sm font-semibold text-green-600">{formatCurrency(basket.totalPrice)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Grand Total */}
      <div className="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-6">
        <div className="mb-2 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span className="text-sm font-semibold text-green-900">Grand Total</span>
        </div>
        <motion.p
          key={grandTotal}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-green-700"
        >
          {formatCurrency(grandTotal)}
        </motion.p>
      </div>

      {/* Undo Button */}
      {canUndo && canUndo() && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => {
            undo?.();
            toast.success('Action undone');
          }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Undo2 className="h-4 w-4" />
          Undo Last Action
        </motion.button>
      )}
    </motion.div>
  );
}


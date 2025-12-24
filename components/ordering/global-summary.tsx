'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, TrendingUp } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { formatCurrency, formatGrams } from '@/lib/utils';

export default function GlobalSummary() {
  const { carts, getGrandTotal } = useCartStore();
  const grandTotal = getGrandTotal();
  const totalGrams = carts.reduce((sum, cart) => sum + cart.totalGrams, 0);
  const totalItems = carts.reduce((sum, cart) => sum + cart.items.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-200 bg-gradient-to-br from-green-50 to-green-100 p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Global Summary</h2>
          <p className="text-sm text-gray-600">Overview of all carts</p>
        </div>
      </div>

      {/* Cart Summaries */}
      <div className="mb-6 space-y-3">
        {carts.map((cart) => (
          <motion.div
            key={cart.id}
            layout
            className="flex items-center justify-between rounded-lg bg-white/80 p-4 backdrop-blur-sm"
          >
            <div>
              <p className="font-semibold text-gray-900">{cart.name}</p>
              <p className="text-sm text-gray-600">
                {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} • {formatGrams(cart.totalGrams)}
              </p>
            </div>
            <p className="text-lg font-bold text-green-600">{formatCurrency(cart.totalPrice)}</p>
          </motion.div>
        ))}
      </div>

      {/* Grand Total */}
      <div className="rounded-xl border-2 border-green-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-semibold text-gray-900">Grand Total</p>
              <p className="text-sm text-gray-600">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} • {formatGrams(totalGrams)}
              </p>
            </div>
          </div>
          <motion.p
            key={grandTotal}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold text-green-600"
          >
            {formatCurrency(grandTotal)}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}


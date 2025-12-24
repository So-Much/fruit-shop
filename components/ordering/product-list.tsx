'use client';

import { motion } from 'framer-motion';
import DraggableProduct from './draggable-product';
import { useCartStore } from '@/store/cart-store';

export default function ProductList() {
  const { products } = useCartStore();

  return (
    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-green-50/30 p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Available Fruits</h2>
        <p className="text-sm text-gray-600">Drag fruits to carts below</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <DraggableProduct product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}


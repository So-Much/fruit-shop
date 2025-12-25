'use client';

import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface DraggableProductProps {
  product: Product;
}

export default function DraggableProduct({ product }: DraggableProductProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: product.id,
    data: {
      type: 'product',
      product,
    },
  });

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`
        group relative flex flex-col items-center rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm
        transition-all duration-200 hover:border-green-400 hover:shadow-md cursor-grab active:cursor-grabbing
        touch-none
        ${isDragging ? 'opacity-20 scale-95' : ''}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Product Image - Main Focus */}
      <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-green-50 to-green-100 text-6xl mb-3">
        {product.image}
      </div>

      {/* Product Info - Small Description */}
      <div className="w-full text-center">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-xs text-gray-600">{formatCurrency(product.pricePerKg)}/kg</p>
      </div>
    </motion.div>
  );
}


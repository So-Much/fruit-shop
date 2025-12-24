'use client';

import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
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
        group relative flex items-center gap-4 rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm
        transition-all duration-200 hover:border-green-400 hover:shadow-md cursor-grab active:cursor-grabbing
        touch-none
        ${isDragging ? 'opacity-20 scale-95' : ''}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Drag Handle Icon (Visual only, drag works on entire card) */}
      <div className="flex cursor-grab items-center justify-center text-gray-400 transition-colors group-hover:text-green-600 pointer-events-none">
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Product Emoji/Image */}
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-50 to-green-100 text-3xl">
        {product.image}
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600">{formatCurrency(product.pricePerKg)}/kg</p>
      </div>
    </motion.div>
  );
}


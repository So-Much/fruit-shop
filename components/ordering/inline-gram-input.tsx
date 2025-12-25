'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Product, CartItem } from '@/types';
import { useCartStore } from '@/store/cart-store';
import { formatCurrency, formatGrams } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { MAX_GRAMS_PER_BASKET } from '@/store/cart-store';

interface InlineGramInputProps {
  product: Product;
  basketId?: string;
  itemId?: string; // For edit mode
  onConfirm: (grams: number) => void;
  onCancel: () => void;
  initialGrams?: number;
}

export default function InlineGramInput({
  product,
  basketId,
  itemId,
  onConfirm,
  onCancel,
  initialGrams = 0,
}: InlineGramInputProps) {
  const { carts, getCartTotalGrams } = useCartStore();
  const [grams, setGrams] = useState(initialGrams.toString());
  const inputRef = useRef<HTMLInputElement>(null);
  const isEditMode = !!itemId && !!basketId;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const inputGrams = parseInt(grams) || 0;
  const currentBasketTotal = basketId ? getCartTotalGrams(basketId) : 0;
  
  // Calculate available space
  let availableSpace: number;
  if (isEditMode && basketId) {
    // When editing, we need to subtract the current item grams to get available space
    availableSpace = MAX_GRAMS_PER_BASKET - (currentBasketTotal - initialGrams);
  } else if (basketId) {
    // When adding to a specific basket
    availableSpace = MAX_GRAMS_PER_BASKET - currentBasketTotal;
  } else {
    // When adding to first available basket (no specific basket)
    availableSpace = MAX_GRAMS_PER_BASKET - (carts[0]?.totalGrams || 0);
  }
  
  const wouldOverflow = inputGrams > availableSpace;

  // Calculate overflow preview
  const calculateOverflowPreview = () => {
    if (!wouldOverflow || inputGrams <= 0) return [];
    
    const preview: Array<{ basketId: string; basketName: string; grams: number; currentTotal: number }> = [];
    
    let remainingGrams = inputGrams;
    let startBasketIndex = 0;

    if (basketId) {
      // Start from specified basket
      startBasketIndex = carts.findIndex((c) => c.id === basketId);
      if (startBasketIndex === -1) startBasketIndex = 0;
      
      // First basket gets available space
      if (availableSpace > 0) {
        const basket = carts[startBasketIndex];
        preview.push({
          basketId: basket.id,
          basketName: basket.name,
          grams: availableSpace,
          currentTotal: (basket.totalGrams - (isEditMode ? initialGrams : 0)) + availableSpace,
        });
        remainingGrams -= availableSpace;
      }
      startBasketIndex++; // Move to next basket for overflow
    }

    // Distribute remaining grams to next baskets
    while (remainingGrams > 0 && startBasketIndex < carts.length + 5) {
      const basket = carts[startBasketIndex] || {
        id: `basket-${carts.length + 1}`,
        name: `Basket ${carts.length + 1}`,
        totalGrams: 0,
      };
      
      const available = MAX_GRAMS_PER_BASKET - basket.totalGrams;
      const gramsToAdd = Math.min(remainingGrams, available);
      
      if (gramsToAdd > 0) {
        preview.push({
          basketId: basket.id,
          basketName: basket.name,
          grams: gramsToAdd,
          currentTotal: basket.totalGrams + gramsToAdd,
        });
        remainingGrams -= gramsToAdd;
      }
      
      startBasketIndex++;
    }

    return preview;
  };

  const overflowPreview = calculateOverflowPreview();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputGrams > 0) {
      onConfirm(inputGrams);
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleInputChange = (value: string) => {
    const numValue = value.replace(/\D/g, '');
    setGrams(numValue);
  };

  const estimatedPrice = inputGrams > 0 ? (product.pricePerKg * inputGrams) / 1000 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="my-2 rounded-lg border-2 border-green-500 bg-white p-4 shadow-lg"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-green-200 text-2xl">
            {product.image}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{product.name}</p>
            <p className="text-xs text-gray-600">{formatCurrency(product.pricePerKg)}/kg</p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          aria-label="Cancel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Input */}
      <div className="mb-3">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={grams}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="0"
            className={cn(
              'w-full rounded-lg border-2 px-4 py-2 pr-12 text-xl font-bold transition-all focus:outline-none focus:ring-2',
              wouldOverflow
                ? 'border-yellow-500 bg-yellow-50 focus:ring-yellow-500'
                : 'border-green-500 bg-green-50 focus:ring-green-500'
            )}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">g</span>
        </div>
      </div>

      {/* Price Preview */}
      {inputGrams > 0 && (
        <div className="mb-3 rounded-lg bg-green-50 p-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-green-900">Price:</span>
            <span className="font-bold text-green-700">{formatCurrency(estimatedPrice)}</span>
          </div>
        </div>
      )}

      {/* Overflow Preview */}
      <AnimatePresence>
        {wouldOverflow && overflowPreview.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 space-y-2 rounded-lg bg-yellow-50 p-3"
          >
            <p className="text-xs font-semibold text-yellow-900">Will be distributed:</p>
            {overflowPreview.map((preview, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-yellow-800">{preview.basketName}:</span>
                <span className="font-semibold text-yellow-900">
                  {formatGrams(preview.grams)} → {formatGrams(preview.currentTotal)} / {formatGrams(MAX_GRAMS_PER_BASKET)}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Cancel (Esc)
        </button>
        <button
          onClick={() => inputGrams > 0 && onConfirm(inputGrams)}
          disabled={inputGrams <= 0}
          className={cn(
            'flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all',
            inputGrams <= 0
              ? 'cursor-not-allowed bg-gray-300'
              : 'bg-green-600 shadow-md hover:bg-green-700 hover:shadow-lg'
          )}
        >
          <Check className="h-4 w-4" />
          Confirm (Enter)
        </button>
      </div>
    </motion.div>
  );
}


'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore } from '@/store/cart-store';
import { formatCurrency, formatGrams } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function QuickGramInput() {
  const { activeModal, closeModal, addProductToBaskets, updateItemGrams, carts } = useCartStore();
  const [grams, setGrams] = useState('');
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isOpen = activeModal.isOpen;
  const product = activeModal.product;
  const isEditMode = !!activeModal.editItemId;
  const cartId = activeModal.cartId;
  const itemId = activeModal.editItemId;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Auto-focus and select text
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
      
      // If editing, prefill with current grams
      if (isEditMode && cartId && itemId) {
        const cart = carts.find((c) => c.id === cartId);
        const item = cart?.items.find((i) => i.id === itemId);
        const currentGrams = item?.grams || 0;
        setGrams(currentGrams.toString());
      } else {
        setGrams('');
      }
      setHasError(false);
    }
  }, [isOpen, isEditMode, cartId, itemId, carts]);

  const handleConfirm = () => {
    if (!product) return;

    const numGrams = parseInt(grams);
    if (isNaN(numGrams) || numGrams <= 0) {
      setHasError(true);
      toast.error('Invalid amount', {
        description: 'Please enter a valid number of grams',
      });
      return;
    }

    if (isEditMode && cartId && itemId) {
      // Update existing item
      updateItemGrams(cartId, itemId, numGrams);
      toast.success('Updated!', {
        description: `${formatGrams(numGrams)} of ${product.name} updated`,
      });
    } else {
      // Add new item
      addProductToBaskets(product, numGrams);
      toast.success('Added!', {
        description: `${formatGrams(numGrams)} of ${product.name} added to baskets`,
      });
    }
    
    // Close modal after successful action
    closeModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  const handleInputChange = (value: string) => {
    const numValue = value.replace(/\D/g, '');
    setGrams(numValue);
    setHasError(false);
  };

  if (!isOpen || !product) return null;

  const inputGrams = parseInt(grams) || 0;
  const estimatedPrice = inputGrams > 0 ? (product.pricePerKg * inputGrams) / 1000 : 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Product Info */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-200 text-4xl">
              {product.image}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
              <p className="text-sm text-gray-600">{formatCurrency(product.pricePerKg)}/kg</p>
              {isEditMode && (
                <p className="mt-1 text-xs text-gray-500">Editing existing item</p>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="mb-4">
            <label htmlFor="grams-input" className="mb-2 block text-sm font-medium text-gray-700">
              Enter grams
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                id="grams-input"
                type="text"
                inputMode="numeric"
                value={grams}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="0"
                autoFocus
                className={cn(
                  'w-full rounded-lg border-2 px-4 py-3 pr-12 text-2xl font-bold transition-all focus:outline-none focus:ring-2',
                  hasError
                    ? 'border-red-500 bg-red-50 focus:ring-red-500'
                    : 'border-gray-300 bg-gray-50 focus:border-green-500 focus:ring-green-500'
                )}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">g</span>
            </div>
          </div>

          {/* Price Preview */}
          {inputGrams > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 rounded-lg bg-green-50 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-900">Estimated price:</span>
                <span className="text-xl font-bold text-green-700">{formatCurrency(estimatedPrice)}</span>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          <AnimatePresence>
            {hasError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>Please enter a valid amount</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={closeModal}
              className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!grams || inputGrams <= 0}
              className={cn(
                'flex-1 rounded-lg px-4 py-3 font-medium text-white transition-all',
                !grams || inputGrams <= 0
                  ? 'cursor-not-allowed bg-gray-300'
                  : 'bg-gradient-to-r from-green-600 to-green-700 shadow-lg hover:from-green-700 hover:to-green-800 hover:shadow-xl'
              )}
            >
              {isEditMode ? 'Update' : 'Add & Distribute'}
            </button>
          </div>

          {/* Hint */}
          <p className="mt-4 text-center text-xs text-gray-500">
            Press <kbd className="rounded bg-gray-100 px-2 py-1 font-mono">Enter</kbd> to confirm
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore } from '@/store/cart-store';
import { formatCurrency, formatGrams } from '@/lib/utils';
import { cn } from '@/lib/utils';

const MAX_GRAMS = 1000;

export default function GramInputModal() {
  const { activeModal, closeModal, addProductToCart, getCartTotalGrams } = useCartStore();
  const [grams, setGrams] = useState('');
  const [hasError, setHasError] = useState(false);
  const [shake, setShake] = useState(false);

  const isOpen = activeModal.isOpen;
  const product = activeModal.product;
  const cartId = activeModal.cartId;

  const currentTotal = cartId ? getCartTotalGrams(cartId) : 0;
  const remainingGrams = MAX_GRAMS - currentTotal;
  const inputGrams = parseInt(grams) || 0;
  const wouldExceed = currentTotal + inputGrams > MAX_GRAMS;

  useEffect(() => {
    if (isOpen) {
      setGrams('');
      setHasError(false);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (!product || !cartId) return;

    const numGrams = parseInt(grams);
    if (isNaN(numGrams) || numGrams <= 0) {
      setHasError(true);
      triggerShake();
      return;
    }

    if (currentTotal + numGrams > MAX_GRAMS) {
      setHasError(true);
      triggerShake();
      return;
    }

    addProductToCart(cartId, product, numGrams);
    toast.success('Added to cart!', {
      description: `${formatGrams(numGrams)} of ${product.name} added`,
    });
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleInputChange = (value: string) => {
    const numValue = value.replace(/\D/g, '');
    setGrams(numValue);
    setHasError(false);
  };

  if (!isOpen || !product || !cartId) return null;

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
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={cn(
            'relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl',
            shake && 'animate-[shake_0.5s_ease-in-out]'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-200 text-4xl">
                {product.image}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                <p className="text-sm text-gray-600">{formatCurrency(product.pricePerKg)}/kg</p>
              </div>
            </div>
          </div>

          {/* Grams Input */}
          <div className="mb-4">
            <label htmlFor="grams-input" className="mb-2 block text-sm font-medium text-gray-700">
              Enter grams
            </label>
            <div className="relative">
              <input
                id="grams-input"
                type="text"
                inputMode="numeric"
                value={grams}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="0"
                className={cn(
                  'w-full rounded-lg border-2 px-4 py-3 text-lg font-semibold transition-all focus:outline-none focus:ring-2',
                  hasError || wouldExceed
                    ? 'border-red-500 bg-red-50 focus:ring-red-500'
                    : 'border-gray-300 bg-gray-50 focus:border-green-500 focus:ring-green-500'
                )}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleConfirm();
                  if (e.key === 'Escape') closeModal();
                }}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">g</span>
            </div>
          </div>

          {/* Info Display */}
          <div className="mb-6 space-y-3 rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Current total:</span>
              <span className="font-medium text-gray-900">{formatGrams(currentTotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Adding:</span>
              <span className="font-medium text-gray-900">{formatGrams(inputGrams)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">New total:</span>
              <span className={cn('font-medium', wouldExceed ? 'text-red-600' : 'text-green-600')}>
                {formatGrams(currentTotal + inputGrams)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-2 text-sm">
              <span className="text-gray-600">Remaining capacity:</span>
              <span
                className={cn(
                  'font-medium',
                  remainingGrams < MAX_GRAMS * 0.2 ? 'text-yellow-600' : 'text-green-600'
                )}
              >
                {formatGrams(remainingGrams)}
              </span>
            </div>

            {/* Price Preview */}
            {inputGrams > 0 && (
              <div className="mt-3 rounded-lg bg-green-100 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-900">Estimated price:</span>
                  <span className="text-lg font-bold text-green-700">
                    {formatCurrency((product.pricePerKg * inputGrams) / 1000)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {(hasError || wouldExceed) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>
                  {wouldExceed
                    ? `Exceeds ${formatGrams(MAX_GRAMS)} limit by ${formatGrams(currentTotal + inputGrams - MAX_GRAMS)}`
                    : 'Please enter a valid amount'}
                </span>
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
              disabled={!grams || inputGrams <= 0 || wouldExceed}
              className={cn(
                'flex-1 rounded-lg px-4 py-3 font-medium text-white transition-all',
                !grams || inputGrams <= 0 || wouldExceed
                  ? 'cursor-not-allowed bg-gray-300'
                  : 'bg-gradient-to-r from-green-600 to-green-700 shadow-lg hover:from-green-700 hover:to-green-800 hover:shadow-xl'
              )}
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


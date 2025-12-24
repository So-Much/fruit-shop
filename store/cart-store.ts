import { create } from 'zustand';
import { CartState, Product, Cart, CartItem } from '@/types';
import { mockProducts } from '@/data/mock-products';

const MAX_GRAMS_PER_CART = 1000;

const createEmptyCart = (id: string, name: string): Cart => ({
  id,
  name,
  items: [],
  totalGrams: 0,
  totalPrice: 0,
});

export const useCartStore = create<CartState>((set, get) => ({
  products: mockProducts,
  carts: [
    createEmptyCart('cart-a', 'Cart A'),
    createEmptyCart('cart-b', 'Cart B'),
    createEmptyCart('cart-c', 'Cart C'),
  ],
  activeModal: {
    isOpen: false,
    cartId: null,
    product: null,
  },

  addProductToCart: (cartId: string, product: Product, grams: number) => {
    const state = get();
    const cart = state.carts.find((c) => c.id === cartId);
    if (!cart) return;

    const currentTotal = state.getCartTotalGrams(cartId);
    if (currentTotal + grams > MAX_GRAMS_PER_CART) {
      return; // Should not happen if validation is correct
    }

    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      product,
      grams,
      price: (product.pricePerKg * grams) / 1000,
    };

    const updatedCarts = state.carts.map((c) => {
      if (c.id === cartId) {
        const updatedItems = [...c.items, newItem];
        const totalGrams = updatedItems.reduce((sum, item) => sum + item.grams, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + item.price, 0);
        return {
          ...c,
          items: updatedItems,
          totalGrams,
          totalPrice,
        };
      }
      return c;
    });

    set({ carts: updatedCarts });
    get().closeModal();
  },

  removeItemFromCart: (cartId: string, itemId: string) => {
    const state = get();
    const updatedCarts = state.carts.map((c) => {
      if (c.id === cartId) {
        const updatedItems = c.items.filter((item) => item.id !== itemId);
        const totalGrams = updatedItems.reduce((sum, item) => sum + item.grams, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + item.price, 0);
        return {
          ...c,
          items: updatedItems,
          totalGrams,
          totalPrice,
        };
      }
      return c;
    });
    set({ carts: updatedCarts });
  },

  updateItemGrams: (cartId: string, itemId: string, grams: number) => {
    const state = get();
    const cart = state.carts.find((c) => c.id === cartId);
    if (!cart) return;

    const currentTotal = state.getCartTotalGrams(cartId);
    const currentItem = cart.items.find((item) => item.id === itemId);
    if (!currentItem) return;

    const newTotal = currentTotal - currentItem.grams + grams;
    if (newTotal > MAX_GRAMS_PER_CART) {
      return; // Validation should prevent this
    }

    const updatedCarts = state.carts.map((c) => {
      if (c.id === cartId) {
        const updatedItems = c.items.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              grams,
              price: (item.product.pricePerKg * grams) / 1000,
            };
          }
          return item;
        });
        const totalGrams = updatedItems.reduce((sum, item) => sum + item.grams, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + item.price, 0);
        return {
          ...c,
          items: updatedItems,
          totalGrams,
          totalPrice,
        };
      }
      return c;
    });
    set({ carts: updatedCarts });
  },

  openModal: (cartId: string, product: Product) => {
    set({
      activeModal: {
        isOpen: true,
        cartId,
        product,
      },
    });
  },

  closeModal: () => {
    set({
      activeModal: {
        isOpen: false,
        cartId: null,
        product: null,
      },
    });
  },

  getCartTotalGrams: (cartId: string) => {
    const state = get();
    const cart = state.carts.find((c) => c.id === cartId);
    return cart?.totalGrams || 0;
  },

  getGrandTotal: () => {
    const state = get();
    return state.carts.reduce((sum, cart) => sum + cart.totalPrice, 0);
  },
}));


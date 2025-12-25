import { create } from 'zustand';
import { CartState, Product, Cart, CartItem } from '@/types';
import { mockProducts } from '@/data/mock-products';
import { toast } from 'sonner';

export const MAX_GRAMS_PER_BASKET = 1000;

const createEmptyBasket = (id: string, name: string): Cart => ({
  id,
  name,
  items: [],
  totalGrams: 0,
  totalPrice: 0,
});

interface HistoryState {
  carts: Cart[];
  timestamp: number;
}

export const useCartStore = create<CartState & {
  history: HistoryState[];
  undo: () => void;
  canUndo: () => boolean;
}>((set, get) => {
  const initialState = {
    products: mockProducts,
    carts: [createEmptyBasket('basket-1', 'Basket 1')],
    activeModal: {
      isOpen: false,
      cartId: null,
      product: null,
      editItemId: null,
    },
    history: [] as HistoryState[],
  };

  const saveHistory = () => {
    const state = get();
    const historyEntry: HistoryState = {
      carts: JSON.parse(JSON.stringify(state.carts)), // Deep clone
      timestamp: Date.now(),
    };
    set({
      history: [...state.history.slice(-9), historyEntry], // Keep last 10 states
    });
  };

  return {
    ...initialState,

    undo: () => {
      const state = get();
      if (state.history.length > 0) {
        const previousState = state.history[state.history.length - 1];
        set({
          carts: previousState.carts,
          history: state.history.slice(0, -1),
        });
      }
    },

    canUndo: () => {
      return get().history.length > 0;
    },

    addProductToCart: (cartId: string, product: Product, grams: number) => {
      // This method is kept for backward compatibility but will use auto-allocation
      const state = get();
      state.addProductToBaskets(product, grams);
    },

    addProductToBaskets: (product: Product, totalGrams: number, skipBasketId?: string) => {
      saveHistory();
      const state = get();
      let remainingGrams = totalGrams;
      let currentBasketIndex = 0;
      const updatedCarts = [...state.carts];
      let basketFullShown = false;

      // Find first available basket or use existing ones
      while (remainingGrams > 0) {
        let currentBasket = updatedCarts[currentBasketIndex];

        // Skip the basket if it's the one we're editing from
        if (skipBasketId && currentBasket?.id === skipBasketId) {
          currentBasketIndex++;
          continue;
        }

        // Create new basket if needed
        if (!currentBasket) {
          const newBasketId = `basket-${updatedCarts.length + 1}`;
          const newBasket = createEmptyBasket(newBasketId, `Basket ${updatedCarts.length + 1}`);
          updatedCarts.push(newBasket);
          currentBasket = newBasket;
        }

        const availableSpace = MAX_GRAMS_PER_BASKET - currentBasket.totalGrams;
        const gramsToAdd = Math.min(remainingGrams, availableSpace);

        if (gramsToAdd > 0) {
          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}-${currentBasketIndex}`,
            productId: product.id,
            product,
            grams: gramsToAdd,
            price: (product.pricePerKg * gramsToAdd) / 1000,
          };

          const basketIndex = updatedCarts.findIndex((c) => c.id === currentBasket.id);
          const updatedItems = [...updatedCarts[basketIndex].items, newItem];
          const totalGrams = updatedItems.reduce((sum, item) => sum + item.grams, 0);
          const totalPrice = updatedItems.reduce((sum, item) => sum + item.price, 0);

          updatedCarts[basketIndex] = {
            ...updatedCarts[basketIndex],
            items: updatedItems,
            totalGrams,
            totalPrice,
          };

          remainingGrams -= gramsToAdd;

          // Show toast if basket is full and there's overflow
          if (gramsToAdd === availableSpace && remainingGrams > 0 && !basketFullShown) {
            toast.info('Basket is full', {
              description: `Remaining ${remainingGrams}g moved to the next basket`,
            });
            basketFullShown = true;
          }
        }

        currentBasketIndex++;
      }

      saveHistory();
      set({ carts: updatedCarts });
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
      saveHistory();
      set({ carts: updatedCarts });
    },

    updateItemGrams: (cartId: string, itemId: string, grams: number) => {
      const state = get();
      const cart = state.carts.find((c) => c.id === cartId);
      if (!cart) return;

      const currentItem = cart.items.find((item) => item.id === itemId);
      if (!currentItem) return;

      const currentTotal = state.getCartTotalGrams(cartId);
      const currentItemGrams = currentItem.grams;
      const newTotal = currentTotal - currentItemGrams + grams;

      // If exceeds basket capacity, handle overflow
      if (newTotal > MAX_GRAMS_PER_BASKET) {
        const remainingInBasket = MAX_GRAMS_PER_BASKET - (currentTotal - currentItemGrams);
        const overflowGrams = grams - remainingInBasket;

        // Update current basket with remaining capacity
        const updatedCarts = state.carts.map((c) => {
          if (c.id === cartId) {
            const updatedItems = c.items.map((item) => {
              if (item.id === itemId) {
                return {
                  ...item,
                  grams: remainingInBasket,
                  price: (item.product.pricePerKg * remainingInBasket) / 1000,
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
        
        if (overflowGrams > 0) {
          toast.info('Basket is full', {
            description: `Remaining ${overflowGrams}g moved to the next basket`,
          });
          
          // Handle overflow by adding to next baskets (inline to avoid double modal close)
          const stateAfterUpdate = get();
          let remainingGrams = overflowGrams;
          let currentBasketIndex = stateAfterUpdate.carts.findIndex((c) => c.id === cartId) + 1;
          const updatedCartsAfterOverflow = [...stateAfterUpdate.carts];

          while (remainingGrams > 0) {
            let currentBasket = updatedCartsAfterOverflow[currentBasketIndex];

            // Create new basket if needed
            if (!currentBasket) {
              const newBasketId = `basket-${updatedCartsAfterOverflow.length + 1}`;
              const newBasket = createEmptyBasket(newBasketId, `Basket ${updatedCartsAfterOverflow.length + 1}`);
              updatedCartsAfterOverflow.push(newBasket);
              currentBasket = newBasket;
            }

            const availableSpace = MAX_GRAMS_PER_BASKET - currentBasket.totalGrams;
            const gramsToAdd = Math.min(remainingGrams, availableSpace);

            if (gramsToAdd > 0) {
              const newItem: CartItem = {
                id: `${currentItem.product.id}-${Date.now()}-${currentBasketIndex}`,
                productId: currentItem.product.id,
                product: currentItem.product,
                grams: gramsToAdd,
                price: (currentItem.product.pricePerKg * gramsToAdd) / 1000,
              };

              const basketIndex = updatedCartsAfterOverflow.findIndex((c) => c.id === currentBasket.id);
              const updatedItems = [...updatedCartsAfterOverflow[basketIndex].items, newItem];
              const totalGrams = updatedItems.reduce((sum, item) => sum + item.grams, 0);
              const totalPrice = updatedItems.reduce((sum, item) => sum + item.price, 0);

              updatedCartsAfterOverflow[basketIndex] = {
                ...updatedCartsAfterOverflow[basketIndex],
                items: updatedItems,
                totalGrams,
                totalPrice,
              };

              remainingGrams -= gramsToAdd;
            }

            currentBasketIndex++;
          }

          set({ carts: updatedCartsAfterOverflow });
        }
      } else {
        // Normal update within capacity
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
      }
    },

    openModal: (cartId: string, product: Product) => {
      // cartId is kept for backward compatibility but not used in new flow
      set({
        activeModal: {
          isOpen: true,
          cartId: null, // Not needed in new flow
          product,
          editItemId: null,
        },
      });
    },

    openEditModal: (cartId: string, itemId: string) => {
      const state = get();
      const cart = state.carts.find((c) => c.id === cartId);
      if (!cart) return;

      const item = cart.items.find((i) => i.id === itemId);
      if (!item) return;

      set({
        activeModal: {
          isOpen: true,
          cartId,
          product: item.product,
          editItemId: itemId,
        },
      });
    },

    closeModal: () => {
      set({
        activeModal: {
          isOpen: false,
          cartId: null,
          product: null,
          editItemId: null,
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
  };
});


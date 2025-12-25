export interface Product {
  id: string;
  name: string;
  image: string;
  pricePerKg: number;
  emoji?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  grams: number;
  price: number;
}

export interface Cart {
  id: string;
  name: string;
  items: CartItem[];
  totalGrams: number;
  totalPrice: number;
}

export interface CartState {
  products: Product[];
  carts: Cart[];
  activeModal: {
    isOpen: boolean;
    cartId: string | null;
    product: Product | null;
    editItemId: string | null;
  };
  addProductToCart: (cartId: string, product: Product, grams: number) => void;
  addProductToBaskets: (product: Product, grams: number, skipBasketId?: string) => void;
  removeItemFromCart: (cartId: string, itemId: string) => void;
  updateItemGrams: (cartId: string, itemId: string, grams: number) => void;
  openModal: (cartId: string, product: Product) => void;
  openEditModal: (cartId: string, itemId: string) => void;
  closeModal: () => void;
  getCartTotalGrams: (cartId: string) => number;
  getGrandTotal: () => number;
  getItemGrams: (cartId: string, itemId: string) => number;
  history?: any[];
  undo?: () => void;
  canUndo?: () => boolean;
}


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
  };
  addProductToCart: (cartId: string, product: Product, grams: number) => void;
  removeItemFromCart: (cartId: string, itemId: string) => void;
  updateItemGrams: (cartId: string, itemId: string, grams: number) => void;
  openModal: (cartId: string, product: Product) => void;
  closeModal: () => void;
  getCartTotalGrams: (cartId: string) => number;
  getGrandTotal: () => number;
}


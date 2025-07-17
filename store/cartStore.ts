import { Product } from "@/types/interfaces";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkv";
export interface CartState {
  products: (Product & { quantity: number })[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  clearCart: () => void;
  totalPrice: number;
  count: number;
}

const INITIAL_STATE: CartState = {
  products: [],
  totalPrice: 0,
  count: 0,
  addProduct: () => {},
  removeProduct: () => {},
  clearCart: () => {},
};

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      addProduct: (product) => {
        const existingProduct = get().products.find(
          (p: Product) => p.id === product.id
        );
        set((state) => {
          const updatedProducts = existingProduct
            ? state.products.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              )
            : [...state.products, { ...product, quantity: 1 }];
          return {
            products: updatedProducts,
            totalPrice: updatedProducts.reduce(
              (total, p) => total + p.price * p.quantity,
              0
            ),
            count: updatedProducts.reduce((total, p) => total + p.quantity, 0),
          };
        });
      },
      removeProduct: (productId: number) => {
        set((state) => {
          const updatedProducts = state.products.filter(
            (p: Product) => p.id !== productId
          );
          return {
            products: updatedProducts,
            totalPrice: updatedProducts.reduce(
              (total, p) => total + p.price * p.quantity,
              0
            ),
            count: updatedProducts.reduce((total, p) => total + p.quantity, 0),
          };
        });
      },
      clearCart: () => {
        set(INITIAL_STATE);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useCartStore;

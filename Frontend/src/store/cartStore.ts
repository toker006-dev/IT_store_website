import { create } from "zustand";
import type { Cart } from "../types";
import * as api from "../api";

interface CartState {
  cart: Cart | null;
  fetchCart: () => Promise<void>;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  totalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,

  fetchCart: async () => {
    const res = await api.getCart();
    set({ cart: res.data });
  },

  addItem: async (productId, quantity) => {
    await api.addToCart(productId, quantity);
    await get().fetchCart();
  },

  updateItem: async (itemId, quantity) => {
    await api.updateCartItem(itemId, quantity);
    await get().fetchCart();
  },

  removeItem: async (itemId) => {
    await api.removeCartItem(itemId);
    await get().fetchCart();
  },

  totalItems: () => {
    const cart = get().cart;
    if (!cart) return 0;
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));

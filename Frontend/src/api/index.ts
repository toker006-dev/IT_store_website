import api from "./axios";
import type { Product, Cart, Order } from "../types";

// Auth
export const register = (data: {
  email: string;
  password: string;
  name: string;
}) => api.post("/auth/register", data);

export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

// Products
export const getProducts = (params?: {
  search?: string;
  categoryId?: number;
}) => api.get<Product[]>("/products", { params });

export const getProductById = (id: number) =>
  api.get<Product>(`/products/${id}`);

export const getCategories = () => api.get("/products/categories");

// Cart
export const getCart = () => api.get<Cart>("/cart");

export const addToCart = (productId: number, quantity: number) =>
  api.post("/cart", { productId, quantity });

export const updateCartItem = (itemId: number, quantity: number) =>
  api.patch(`/cart/${itemId}`, { quantity });

export const removeCartItem = (itemId: number) => api.delete(`/cart/${itemId}`);

// Orders
export const createOrder = () => api.post<Order>("/orders");

export const getOrders = () => api.get<Order[]>("/orders");

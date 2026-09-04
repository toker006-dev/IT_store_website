import { Response } from "express";
import {prisma} from "../lib/prisma";
import { AuthRequest } from "../middleware/auth";

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: req.userId! },
      include: { items: { include: { product: true } } },
    });

    res.json(cart || { items: [] });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await prisma.cart.findUnique({ where: { userId: req.userId! } });

    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: req.userId! } });
    }

    const existing = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      });
    }

    const updated = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: { include: { product: true } } },
    });

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: Number(itemId) } });
      res.json({ message: "Item removed" });
      return;
    }

    const updated = await prisma.cartItem.update({
      where: { id: Number(itemId) },
      data: { quantity },
    });

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const removeCartItem = async (req: AuthRequest, res: Response) => {
  const { itemId } = req.params;

  try {
    await prisma.cartItem.delete({ where: { id: Number(itemId) } });
    res.json({ message: "Item removed" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

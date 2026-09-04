import { Request, Response } from "express";
import {prisma} from "../lib/prisma";

export const getProducts = async (req: Request, res: Response) => {
  const { search, categoryId } = req.query;

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(search && {
          name: { contains: search as string, mode: "insensitive" },
        }),
        ...(categoryId && { categoryId: Number(categoryId) }),
      },
      include: { category: true },
    });

    res.json(products);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { category: true },
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json(product);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

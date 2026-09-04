import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import authRoutes from "./routes/auth.routes";
// import productRoutes from "./routes/product.routes";
// import cartRoutes from "./routes/cart.routes";
// import orderRoutes from "./routes/order.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "🚀 IT_store_Website API is running!" });
});

// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

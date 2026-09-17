import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api";
import type { Product } from "../types";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    getProductById(Number(id))
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    setAdding(true);
    await addItem(product!.id, quantity);
    setAdding(false);
    navigate("/cart");
  };

  if (loading)
    return <div className="text-center py-20 text-gray-500">กำลังโหลด...</div>;
  if (!product)
    return <div className="text-center py-20 text-gray-500">ไม่พบสินค้า</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-6 block"
      >
        ← กลับ
      </button>

      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-8">
        <img
          src={product.imageUrl || "https://placehold.co/400x400?text=No+Image"}
          alt={product.name}
          className="w-full md:w-80 h-80 object-cover rounded-xl bg-gray-100"
        />

        <div className="flex flex-col gap-4 flex-1">
          <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full w-fit">
            {product.category.name}
          </span>
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-500">{product.description}</p>
          <p className="text-3xl font-bold text-blue-600">
            ฿{product.price.toLocaleString()}
          </p>

          <p
            className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
          >
            {product.stock > 0 ? `มีสินค้า ${product.stock} ชิ้น` : "สินค้าหมด"}
          </p>

          {product.stock > 0 && (
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">จำนวน:</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg"
                >
                  −
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || adding}
            className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 font-medium mt-auto"
          >
            {adding ? "กำลังเพิ่ม..." : "🛒 เพิ่มลงตะกร้า"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

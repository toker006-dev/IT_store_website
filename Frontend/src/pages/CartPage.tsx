import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { createOrder } from "../api";

const CartPage = () => {
  const { cart, fetchCart, updateItem, removeItem } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const total =
    cart?.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ) || 0;

  const handleCheckout = async () => {
    await createOrder();
    navigate("/order-confirmation");
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg mb-4">ตะกร้าของคุณว่างเปล่า</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          เลือกซื้อสินค้า
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">ตะกร้าสินค้า</h1>

      <div className="flex flex-col gap-4 mb-6">
        {cart.items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-4 flex items-center gap-4"
          >
            <img
              src={
                item.product.imageUrl ||
                "https://placehold.co/100x100?text=No+Image"
              }
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded-lg bg-gray-100"
            />

            <div className="flex-1">
              <p className="font-semibold text-gray-800">{item.product.name}</p>
              <p className="text-blue-600 font-bold">
                ฿{item.product.price.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => updateItem(item.id, item.quantity - 1)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg"
              >
                −
              </button>
              <span className="px-4 py-1">{item.quantity}</span>
              <button
                onClick={() => updateItem(item.id, item.quantity + 1)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg"
              >
                +
              </button>
            </div>

            <p className="font-bold text-gray-800 w-24 text-right">
              ฿{(item.product.price * item.quantity).toLocaleString()}
            </p>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-400 hover:text-red-600 text-xl"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">รวมทั้งหมด</span>
          <span className="text-2xl font-bold text-blue-600">
            ฿{total.toLocaleString()}
          </span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium"
        >
          สั่งซื้อสินค้า
        </button>
      </div>
    </div>
  );
};

export default CartPage;

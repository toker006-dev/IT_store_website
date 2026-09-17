import { useEffect, useState } from "react";
import { getOrders } from "../api";
import type { Order } from "../types";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-center py-20 text-gray-500">กำลังโหลด...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        ประวัติคำสั่งซื้อ
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          ยังไม่มีคำสั่งซื้อ
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-bold text-gray-800">
                    คำสั่งซื้อ #{order.id}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                    {order.status}
                  </span>
                  <p className="text-blue-600 font-bold mt-1">
                    ฿{order.total.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>
                      ฿{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

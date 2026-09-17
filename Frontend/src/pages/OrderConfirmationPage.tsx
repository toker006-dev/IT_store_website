import { useNavigate } from "react-router-dom";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md p-10 text-center max-w-md w-full">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          สั่งซื้อสำเร็จ!
        </h1>
        <p className="text-gray-500 mb-8">
          ขอบคุณที่ใช้บริการ IT Shop ระบบได้รับคำสั่งซื้อของคุณแล้ว
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            ดูประวัติคำสั่งซื้อ
          </button>
          <button
            onClick={() => navigate("/")}
            className="border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50"
          >
            เลือกซื้อสินค้าต่อ
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

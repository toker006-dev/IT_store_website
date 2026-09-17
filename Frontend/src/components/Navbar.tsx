import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const { totalItems } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          🖥️ IT Shop
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            สินค้า
          </Link>

          {isAuthenticated() ? (
            <>
              <span className="text-gray-500 text-sm">
                สวัสดี, {user?.name}
              </span>
              <Link to="/orders" className="text-gray-600 hover:text-blue-600">
                คำสั่งซื้อ
              </Link>
              <Link
                to="/cart"
                className="relative text-gray-600 hover:text-blue-600"
              >
                🛒
                {totalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems()}
                  </span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700"
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                เข้าสู่ระบบ
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
              >
                สมัครสมาชิก
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

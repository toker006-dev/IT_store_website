import { Link } from "react-router-dom";
import type { Product } from "../types";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col gap-3">
        <img
          src={product.imageUrl || "https://placehold.co/400x400?text=No+Image"}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg bg-gray-100"
        />
        <div>
          <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
            {product.category.name}
          </span>
          <h3 className="font-semibold text-gray-800 mt-1 line-clamp-2">
            {product.name}
          </h3>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-blue-600">
            ฿{product.price.toLocaleString()}
          </span>
          <span
            className={`text-xs ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
          >
            {product.stock > 0 ? `เหลือ ${product.stock} ชิ้น` : "สินค้าหมด"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

import { useEffect, useState } from "react";
import ProductInformation from "./ProductInformation.jsx";
import { useProduct } from "../Store/Products.jsx";
import PropTypes from "prop-types";
import { productsAPI } from "../../API/API.js";

import "./DisplayProduct.css";

export default function DisplayProduct({ onAddToCart }) {
  const { setProduct } = useProduct();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
          const data = await productsAPI();
          localStorage.setItem("product", JSON.stringify(data.results));
          setProduct({
            productId: data.results.productId,
            productName: data.results.productName,
            category: data.results.category,
            imageUrl: data.results.imageUrl,
            price: data.results.price,
            stock: data.results.stock,
            description: data.results.description,
          });
          setProducts(data.results); // 假設 API 返回的數據中包含產品列表
      } catch (error) {
        setError("無法獲取產品資訊，請稍後再試");
        console.error(error);
      }
    };

    fetchProducts();
  }, []); // 確保 useEffect 只在組件掛載時執行一次

  return (
    <main>
      <h2>熱門產品</h2>
      {error && <p className="error">{error}</p>}
      <div className="product-list">
        {products.map((productItem) => (
          <ProductInformation
            key={productItem.productId}
            product={productItem}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </main>
  );
}

DisplayProduct.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
};

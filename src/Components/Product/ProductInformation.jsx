import PropTypes from "prop-types";
import "./ProductInformation.css";
export default function ProductInformation({ product, onAddToCart }) {
  return (
    <div className="product-item">
      <img
        src={product.imageUrl}
        alt={product.productName}
        className="product-image"
      />
      <h2 className="product-name">{product.productName}</h2>
      <p className="product-category">{product.category}</p>
      <p className="product-price">價格: {product.price}</p>
      <p className="product-stock">庫存: {product.stock}</p>
      <p className="product-description">
        {product.description ? product.description : "無描述"}
      </p>
      <button
        className="add-to-cart-button"
        onClick={() => onAddToCart(product)}
      >
        加入購物車
      </button>
    </div>
  );
}

ProductInformation.propTypes = {
  product: PropTypes.shape({
    imageUrl: PropTypes.string,
    productName: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    stock: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import './Cart.css';

export default function CartItem({ item }) {
  return (
    <li className="cart-item">
      <img src={item.imageUrl} alt={item.productName} />
      <div className="item-details">
        <label>品名</label>
        <span className="item-name">{item.productName}</span>
      </div>
      <div className="item-details">
        <label>類型</label>
        <span className="item-name">{item.category}</span>
      </div>
      <div className="item-details">
        <label>單價 NT$</label>
        <span className="item-name">{item.price}</span>
      </div>
      <div className="item-details">
        <label>庫存</label>
        <span className="item-name">{item.stock}</span>
      </div>
      <div className="item-details">
        <label>數量</label>
        <span className="item-name">{item.quantity}</span>
      </div>
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};
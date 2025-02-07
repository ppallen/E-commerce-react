import PropTypes from "prop-types";
import CartItem from "./CartItem";

import { createOrders } from "../../API/API.js";
import {useUser} from "../Store/user.jsx";

import "./Cart.css";

export default function Cart({ cartItems, setCartItems }) {
  const {user} = useUser();
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  function handleBuy() {
    if (cartItems.length === 0) {
      alert("購物車為空");
      return;
    }
    if (window.confirm("確定要購買嗎?")) {
      const orderData = {
        buyItemList: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };
      const userId = user.userId;
      try {
        createOrders(userId, orderData);
        alert("購買成功");
        setCartItems([]);
      } catch (error) {
        alert(error.message);
      }
    }
  }

  return (
    <div>
      <h2>購物車</h2>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </ul>
      <div className="cart-summary">
        <h3>總價: NT${calculateTotalPrice()}</h3>
        <button onClick={handleBuy}>確定購買</button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  setCartItems: PropTypes.func.isRequired,
};

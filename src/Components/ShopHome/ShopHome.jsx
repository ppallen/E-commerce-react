import { useState } from "react";

import Header from "../Header/Header.jsx";
import DisplayProduct from "../Product/DisplayProduct.jsx";
import Cart from "../Cart/Cart.jsx";
import Logs from "../Logs/Logs.jsx";
import Profile from "../Profile/Profile.jsx";
import {useNavigate} from "react-router-dom";

import "./ShopHome.css";

export default function ShopHome() {
  const [currentPage, setCurrentPage] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (product) => {
    let alertShown = false; // 用於確保 alert 只顯示一次
    setCartItems((prevItems) => {
      // 檢查購物車中是否已經存在該產品
      const existingItem = prevItems.find((item) => item.productId === product.productId);
      
      if (existingItem) {
        // 如果存在，且數量未超過庫存，則增加其數量
        if (existingItem.quantity < product.stock) {
          return prevItems.map((item) =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // 如果數量已達到庫存上限，顯示提示信息
          if (!alertShown) {
            alert('已達到庫存上限');
            alertShown = true;
          }
          return prevItems;
        }
      } else {
        // 如果不存在，且庫存大於0，則將其作為新項目添加到購物車中
        if (product.stock > 0) {
          return [...prevItems, { ...product, quantity: 1 }];
        } else {
          // 如果庫存不足，顯示提示信息
          alert('庫存不足');
          return prevItems;
        }
      }
    });
  };


  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <DisplayProduct onAddToCart={handleAddToCart} />;
      case "cart":
        return <Cart cartItems={cartItems} setCartItems={setCartItems} />;
      case "logs":
        return <Logs />;
      case "profile":
        return <Profile />;
      default:
        return <DisplayProduct onAddToCart={handleAddToCart} />;
    }
  };

  function handleLogout(){
    // 清除本地存儲中的用戶資料
    localStorage.removeItem('user');
    localStorage.removeItem('product');
    // 顯示確認對話框
    if (window.confirm('確定要登出嗎？')) {
      // 導航到登錄頁面
      navigate('/');
    }
    
  }

  return (
    <div className="shop-home">
      <Header onNavigate={handleNavigate} totalItems={getTotalItems()} onLogout={handleLogout} />
      <main>{renderContent()}</main>
    </div>
  );
}

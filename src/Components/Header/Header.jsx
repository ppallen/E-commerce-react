import PropTypes from 'prop-types';
import './Header.css';

export default function Header({ onNavigate, totalItems, onLogout }) {
  return (
    <header className="shop-header">
      <div className="top-row">
        <h1>電商網站</h1>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>
      <nav className="bottom-row">
        <ul>
          <li>
            <button onClick={() => onNavigate("home")}>首頁</button>
          </li>
          <li>
            <button onClick={() => onNavigate("cart")}>購物車 ({totalItems})</button>
          </li>
          <li>
            <button onClick={() => onNavigate("logs")}>訂單紀錄</button>
          </li>
          <li>
            <button onClick={() => onNavigate("profile")}>個人資料</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

Header.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  onLogout: PropTypes.func.isRequired,
};
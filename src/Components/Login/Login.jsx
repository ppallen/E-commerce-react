import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { loginAPI } from "../../API/API.js"; // 假設你有一個 login API 函數
import { useUser } from "../Store/user.jsx";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setLoading(true);
    setError("");
    try {
      const data = await loginAPI(email, password);
      console.log("登入成功", data);
      localStorage.setItem("token", data.token); // 假設 API 返回的數據中包含 token
      //將資料存在user.js
      setUser({
        userId: data.userId,
        email: data.e_mail,
        createdDate: data.createdDate,
        lastModifiedDate: data.lastModifiedDate,
      }); // 假設 API 返回的數據中包含 user 資料

      navigate("/shop");
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("Failed to fetch")) {
        setError("API錯誤或無法連接到服務器，請檢查服務器是否正在運行");
      } else {
        setError(error.message || "Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>登入</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">信箱:</label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密碼:</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="button-group">
            <Link to="/register">
              <button type="button" className="register-button">
                註冊
              </button>
            </Link>
            <button type="submit" disabled={loading}>
              {loading ? "登入中..." : "登入"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

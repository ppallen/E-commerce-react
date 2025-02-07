import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultModal from "./ResultModal.jsx";
import { registerAPI } from "../API/API.js";
export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dialog = useRef();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 在這裡處理註冊邏輯
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setError("");
    try {
      const data = await registerAPI(email, password);
      console.log("註冊成功", data);
      dialog.current.open();
    } catch (error) {
      if (error.message.includes("Failed to fetch")) {
        setError("API錯誤或網址錯誤");
      } else if (error.message.includes("帳號已存在")) {
        setError("帳號已存在，請使用其他帳號");
      } else {
        setError(error.message || "Please try again");
      }
    }

    // 註冊完成後導航回登入頁面
  };

  const handleDialogClose = () => {
    dialog.current.close();
    navigate("/");
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2>註冊</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">電子郵件:</label>
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
          <button type="submit">註冊完成</button>
        </form>
      </div>
      <ResultModal onClose={handleDialogClose} ref={dialog} />
    </div>
  );
}

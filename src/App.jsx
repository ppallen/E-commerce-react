import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register.jsx";
import ShopHome from "./Components/ShopHome/ShopHome.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import { UserProvider } from "./Components/Store/user.jsx";
import { ProductProvider } from "./Components/Store/Products.jsx";

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/shop"
              element={
                <PrivateRoute>
                  <ShopHome />
                </PrivateRoute>
              }
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;

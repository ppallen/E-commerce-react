import { createContext, useContext, useState } from "react";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(() => {
    const savedUser = localStorage.getItem("product");
    return savedUser
      ? JSON.parse(savedUser)
      : {
          productId: "",
          productName: "",
          category: "",
          imageUrl: "",
          price: "",
          stock: "",
          description: "",
        };
  });

  const setProductData = (productData) => {
    setProduct(productData);
    localStorage.setItem("product", JSON.stringify(productData));
  };

  return (
    <ProductContext.Provider value={{ product, setProduct: setProductData }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};


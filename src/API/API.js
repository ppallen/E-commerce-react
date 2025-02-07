export async function loginAPI(email, password) {
    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("登入失敗");
    }

    const data = await response.json();
    return data;
}

export async function registerAPI(email, password) {

    const response = await fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("註冊失敗");
    }

    const data = await response.json();
    return data;

}

export async function productsAPI(){
  const response = await fetch("http://localhost:8080/products", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("產品取得失敗");
  }

  const data = await response.json();
  return data;
}

export async function getOrders(userId){
  const response = await fetch(`http://localhost:8080/users/${userId}/orders`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("訂單取得失敗");
  }

  const data = await response.json();
  return data;

}

export async function createOrders(userId, orderData){
  const response = await fetch(`http://localhost:8080/users/${userId}/orders`, {
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) {
    throw new Error("訂單送出失敗");
  }

  const data = await response.json();
  return data;
  /*
  {
    "buyItemList":[
      {
        "productId":4,
        "quantity":5
      },
      {
        "productId":6,
        "quantity":2
      }
    ]
  }
  */
}

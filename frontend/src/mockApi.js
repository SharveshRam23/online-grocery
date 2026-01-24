// frontend/src/mockApi.js

const API =
  process.env.REACT_APP_API_URL ||
  "https://online-grocery-gc6r.onrender.com/api";

// ---- helpers ----
const getToken = () => localStorage.getItem("token");

const authHeaders = () =>
  getToken() ? { Authorization: `Bearer ${getToken()}` } : {};

async function handleJson(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.msg || data.message || "Request failed");
  }
  return data;
}

// ---- AUTH ----
export const registerUser = async (userData) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return handleJson(res);
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await handleJson(res);

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

// ---- PRODUCTS ----
export const fetchProducts = async () => {
  const res = await fetch(`${API}/products`);
  return handleJson(res);
};

export const createProduct = async (product) => {
  const res = await fetch(`${API}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(product),
  });
  return handleJson(res);
};

// ---- ORDERS ----
export const fetchOrders = async () => {
  const res = await fetch(`${API}/orders`, {
    headers: authHeaders(),
  });
  return handleJson(res);
};

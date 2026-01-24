const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://online-grocery-gc6r.onrender.com/api";

const jsonHeaders = {
  "Content-Type": "application/json",
};

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ---------- AUTH ----------
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Login failed");
  return data;
}

export async function register(user) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Register failed");
  return data;
}

// frontend/src/pages/AdminLogin.js

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../mockApi";
import "../styles.css";

export default function AdminLogin() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      // ✅ SAFETY CHECK
      if (res.user.role !== "admin") {
        throw new Error("Not an admin account");
      }

      // ✅ Store correct user info
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: res.user.name,
          email: res.user.email,
          role: res.user.role,
        })
      );

      history.push("/admin");
    } catch (err) {
      setError("Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <form className="admin-card" onSubmit={handleLogin}>
        <h2>Admin Portal</h2>

        {error && <div className="error-msg">{error}</div>}

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="footer-text">
          New admin?{" "}
          <span onClick={() => history.push("/admin/register")}>
            Register
          </span>
        </div>
      </form>
    </div>
  );
}

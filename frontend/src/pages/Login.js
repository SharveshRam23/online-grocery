import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { loginUser } from "../mockApi";
import "../styles.css";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      const { role, name } = res.user;
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ name, email, role })
      );

      if (role === "admin") history.push("/admin");
      else if (role === "delivery") history.push("/delivery");
      else history.push("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome back</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
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

          <button type="submit">Login</button>
        </form>

        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
        <p>
          Shop owner? <Link to="/admin/login">Admin Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { registerUser } from "../mockApi";
import "../App.css";

function AdminRegister() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser({
        name,
        email,
        password,
        role: "admin",
      });

      alert("Admin registered successfully. Please login.");
      history.push("/admin/login");
    } catch (err) {
      alert(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Create Admin Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register as Admin"}
          </button>
        </form>

        <p>
          Already an admin? <Link to="/admin/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminRegister;

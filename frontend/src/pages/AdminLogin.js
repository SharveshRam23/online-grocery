import { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../api";

export default function AdminLogin() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ role: data.role, email })
      );

      history.push("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p>{error}</p>}
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}

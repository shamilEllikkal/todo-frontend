import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (response.ok) {
      navigate("/login");
      console.log("Registration successful", data);
    } else {
      alert("Error occurred", data.message);
    }
  };

  return (
    <div className="todo-container">
      <h2>Sign Up</h2>
      <form
        onSubmit={handleSubmit}
        style={{ flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="username"
          required
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="add">
          Register
        </button>
      </form>
      <p style={{ marginTop: "10px" }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;

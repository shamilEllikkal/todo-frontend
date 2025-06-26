import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    console.log(response.data)
    const data = await response.json();
    localStorage.setItem("token", data.accessToken);
    console.log("Login successful", data);
    if (response.ok) {
      setUser(data.User);
       localStorage.setItem("user", JSON.stringify(data.User));
        localStorage.setItem("token", data.accessToken);
      navigate("/todo");
    } else {
      alert("Error occurred: " + data.message);
    }
  };

  return (
    <div className="todo-container">
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{ flexDirection: "column", gap: "10px" }}
      >
      
        <input
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="add">
          Login
        </button>
      </form>
      <p style={{ marginTop: "10px" }}>
        Don't have an account? <a href="/">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;

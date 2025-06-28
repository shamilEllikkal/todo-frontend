import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosIntanse.js"
const Login = ({ setUser }) => {
  // const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  //  const fetchLogin =async ()=>{
    // try {
    //   const res = await axios.post("/login",{
    //     email:email,
    //     password:password
    //   });
    //      const data = await res.data;
    // localStorage.setItem("token", data.accessToken);
    //   console.log(data)


    // }catch{
    //   console.log('error logining in')
    // }
    const data = {
      email,
      password
    }

     axios.post('/login', data).then((res)=>{
      localStorage.setItem("token",res.data.accessToken)
      localStorage.setItem("user",JSON.stringify(res.data.User))
      setUser(res.data.User)
      
      navigate("/todo")
      console.log(res.data);
      
     }).catch((err)=>{
      console.log(err);
      
     })
  
   

  //  }

  //  const response = await fetch("http://localhost:5000/api/login", {
  //     method: "POST",
  //     headers: {
  //        Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(form),
  //   });
  //   console.log(response.data)
 
  //   console.log("Login successful", data);
  //   if (response.ok) {
 
  //   } else {
  //     alert("Error occurred: " + data.message);
  //   }


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
          value={email}
          onChange={(e) => setEmail( e.target.value )}
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
          value={password}
          onChange={(e) => setPassword( e.target.value )}
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

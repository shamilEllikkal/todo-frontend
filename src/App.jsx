import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TodoPage from "./pages/TodoPage";
import ProtectedRouter from "./ProtectRouter";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/" element={<ProtectedRouter />} > 
      <Route path="todo" element={<TodoPage user={user} setUser={setUser} />} />
      <Route path="/profile" element={<ProfilePage  user={user} /> } />
      </Route>
    </Routes>
  );
}

export default App;

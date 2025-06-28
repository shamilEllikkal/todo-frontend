import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { useCallback } from "react";
const TodoPage = ({ user, setUser }) => {
console.log(user)
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const [tasks, setTasks] = useState([]);
  const [session, setSession] = useState(false)

const handleProfile =()=>{
  navigate("/profile")
}

 const userSession = useCallback(async () => {
    const response = await fetch("http://localhost:5000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      setSession(true)
    }else{
      localStorage.clear()
      navigate("/login")
    }
  }, [navigate]);
    useEffect(() => {
   userSession();
  }, [userSession]);
  const getTasks = async () => {
    const response = await fetch("http://localhost:5000/api/get-tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);
  const addTodo = async (text) => {
    console.log(text, "text");

    const response = await fetch("http://localhost:5000/api/create-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ...tasks, taskname: text }),
    });
    if(response.ok){
getTasks();
    }else{
       localStorage.clear()
      navigate("/login")
    }
    
    // userSession(); // Refresh the tasks list after adding a new todo
  };

  const deleteTodo = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/delete-task/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if(response.ok){
getTasks();
    }else{
       localStorage.clear()
      navigate("/login")
    }
  };

  const updateTodo = async (id, newText) => {
    console.log(id);
    
    const response = await fetch(`http://localhost:5000/api/update-task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body:JSON.stringify({taskname:newText})
    });
    const data = await response.json();
    console.log(data)
     if(response.ok){
getTasks();
    }else{
       localStorage.clear()
      navigate("/login")
    }
   
  };

  return (
    <div className="todo-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "35px",
        }}
      >
        <h2>Welcome {user?.username || "User"} </h2>
        <button onClick={logout} className="delete">
          Logout
        </button>
        <button style={{ backgroundColor: "green" ,color:"white"}} onClick={handleProfile} >profile</button>
      </div>
      
      <TodoForm addTodo={addTodo} />
      <div>
        {tasks.length==0 ? <p>no tasks</p> : 
      
      <div className="todo-list">
        {tasks.map((task) => (
          <TodoItem
            key={task._id}
            task={task}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>}</div>
    </div>
  );
};

export default TodoPage;

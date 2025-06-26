import { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);      
      setText("");
    }
    
    
  };


  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input style={{ padding:"10px",borderRadius:"5px", border:"1px solid #ccc"}}
        type="text"
        placeholder="Add a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="add">Add</button>
    </form>
    
      </div>
  );
};

export default TodoForm;

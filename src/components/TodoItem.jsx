import { useState, } from "react";

const TodoItem = ({ task, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.taskname);


  // console.log(tasks)
  const handleEdit = () => {
    if (isEditing && text.trim()) {
      updateTodo(task._id, text);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="todo">
      {isEditing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <span>{task.taskname}</span>
      )}
      <div className="actions">
        <button onClick={handleEdit} className="edit">
          {isEditing ? "Save" : "Edit"}
        </button>
        <button onClick={() => deleteTodo(task._id)} className="delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

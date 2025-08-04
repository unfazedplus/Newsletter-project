import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import type { Task } from "./types";
import "./App.css";

// Home Component
const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const handleClearCompleted = () => {
    if (window.confirm("Are you sure you want to clear all completed tasks?")) {
      const updatedTasks = tasks.filter(task => !task.completed);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      
      <div className="task-actions">
        <Link to="/add-task" className="btn btn-primary add-task-btn">
          + Add Task
        </Link>
        
        <div className="filter-buttons">
          <button 
            className={`btn ${filter === "all" ? "btn-primary" : ""}`} 
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button 
            className={`btn ${filter === "active" ? "btn-primary" : ""}`} 
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button 
            className={`btn ${filter === "completed" ? "btn-primary" : ""}`} 
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          {tasks.some(task => task.completed) && (
            <button className="btn btn-danger" onClick={handleClearCompleted}>
              Clear Completed
            </button>
          )}
        </div>
      </div>
      
      {filteredTasks.length > 0 ? (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <Link to={`/task/${task.id}`} className="task-link">
                <div className="task-title">{task.title}</div>
                <span className={`status-badge ${task.completed ? "status-complete" : "status-pending"}`}>
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-tasks">
          {filter === "all" 
            ? "No tasks found. Add a new task to get started!" 
            : `No ${filter} tasks found.`}
        </p>
      )}
    </div>
  );
};

// AddTask Component
const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }
    
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTask: Task = {
      id: tasks.length + 1,
      title: title,
      description: description,
      completed: false,
    };
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Add New Task</h1>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="task-actions">
        <button className="btn btn-primary" onClick={handleSubmit}>Add Task</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </div>
    </div>
  );
};

// EditTask Component
const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    const foundTask = tasks.find((task) => task.id === Number(id));
    setTask(foundTask || null);
  }, [id]);

  const handleEdit = () => {
    if (!task?.title.trim()) {
      alert("Please enter a task title");
      return;
    }
    
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = tasks.map((t) => (t.id === task?.id ? task : t));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/");
  };

  const toggleComplete = () => {
    if (task) {
      setTask({ ...task, completed: !task.completed });
    }
  };

  return (
    <div className="container">
      {task ? (
        <>
          <h1>Edit Task</h1>
          <input 
            type="text" 
            value={task.title} 
            onChange={(e) => setTask({ ...task, title: e.target.value })} 
          />
          <textarea 
            value={task.description} 
            onChange={(e) => setTask({ ...task, description: e.target.value })} 
          />
          <div className="task-actions">
            <button className="btn btn-primary" onClick={handleEdit}>Update Task</button>
            <button 
              className={`btn ${task.completed ? "btn-danger" : "btn-info"}`} 
              onClick={toggleComplete}
            >
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
          </div>
        </>
      ) : (
        <p>Task not found.</p>
      )}
    </div>
  );
};

// TaskDetails Component
const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    const foundTask = tasks.find((task) => task.id === Number(id));
    setTask(foundTask || null);
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasks = tasks.filter((t) => t.id !== Number(id));
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      navigate("/");
    }
  };

  const toggleComplete = () => {
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      setTask(updatedTask);
      
      const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasks = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  return (
    <div className="container task-details">
      {task ? (
        <>
          <h1>
            {task.title}
            <span className={`status-badge ${task.completed ? "status-complete" : "status-pending"}`}>
              {task.completed ? "Completed" : "Pending"}
            </span>
          </h1>
          <p>{task.description}</p>
          <div className="task-actions">
            <Link to={`/edit-task/${task.id}`} className="btn btn-info">Edit Task</Link>
            <button 
              className={`btn ${task.completed ? "btn-danger" : "btn-primary"}`} 
              onClick={toggleComplete}
            >
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete Task</button>
            <Link to="/" className="btn">Back to List</Link>
          </div>
        </>
      ) : (
        <div>
          <p>Task not found.</p>
          <Link to="/" className="btn btn-primary">Back to List</Link>
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
};

export default App;
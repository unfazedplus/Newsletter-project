import { useState, useEffect } from 'react';
import { Header } from './Header';
import type { AccountSettings } from '../../types/newsletter';
import type { Task } from '../types';
import { CheckCircle, Circle, Edit, Trash2, Plus } from 'lucide-react';

interface TaskManagerViewProps {
  setCurrentView: (view: string) => void;
  accountSettings: AccountSettings;
  setAccountSettings: (settings: AccountSettings) => void;
}

export function TaskManagerView({ 
  setCurrentView,
  accountSettings,
  setAccountSettings
}: TaskManagerViewProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      alert("Please enter a task title");
      return;
    }
    
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
    };
    
    // Create a new array with the new task to ensure state update
    const updatedTasks = [...tasks, newTask];
    console.log('Adding task:', newTask);
    console.log('Updated tasks:', updatedTasks);
    
    setTasks(updatedTasks);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const handleUpdateTask = () => {
    if (!editingTask || !editingTask.title.trim()) {
      alert("Please enter a task title");
      return;
    }
    
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? editingTask : task
    ));
    setEditingTask(null);
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const handleClearCompleted = () => {
    if (window.confirm("Are you sure you want to clear all completed tasks?")) {
      setTasks(tasks.filter(task => !task.completed));
    }
  };

  return (
    <div>
      <Header 
        setCurrentView={setCurrentView}
        showProfile={false}
        setShowProfile={() => {}}
        accountSettings={accountSettings}
        setAccountSettings={setAccountSettings}
        searchQuery=""
        setSearchQuery={() => {}}
      />
      
      <div className="task-manager-container">
        <div className="task-manager-header">
          <div className="header-navigation">
            <button 
              className="btn btn-secondary back-button"
              onClick={() => setCurrentView('home')}
            >
              ← Back to Home
            </button>
          </div>
          <h1>Task Manager</h1>
        </div>
        
        <div className="task-filter-container">
          <div className="filter-buttons">
            <button 
              className={`btn ${filter === "all" ? "btn-primary" : "btn-secondary"}`} 
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button 
              className={`btn ${filter === "active" ? "btn-primary" : "btn-secondary"}`} 
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button 
              className={`btn ${filter === "completed" ? "btn-primary" : "btn-secondary"}`} 
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
        
        {/* Add Task Form */}
        <div className="task-form-container">
          {editingTask ? (
            <>
              <h3>Edit Task</h3>
              <form 
                className="task-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateTask();
                }}
              >
                <input
                  type="text"
                  className="form-input"
                  placeholder="Task Title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                  required
                />
                <textarea
                  className="form-textarea"
                  placeholder="Task Description"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                  rows={3}
                />
                <div className="task-form-actions">
                  <button type="submit" className="btn btn-primary">
                    Update Task
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingTask(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h3>Add New Task</h3>
              <form 
                className="task-form" 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddTask();
                }}
              >
                <input
                  type="text"
                  className="form-input"
                  placeholder="Task Title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  required
                />
                <textarea
                  className="form-textarea"
                  placeholder="Task Description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  rows={3}
                />
                <button type="submit" className="btn btn-primary">
                  <Plus size={16} /> Add Task
                </button>
              </form>
            </>
          )}
        </div>
        
        {/* Task List */}
        <div className="task-list-container">
          <h3>Tasks</h3>
          {filteredTasks.length > 0 ? (
            <ul className="task-list">
              {filteredTasks.map((task) => (
                <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
                  <div className="task-item-content">
                    <button 
                      className="task-toggle-button"
                      onClick={() => toggleTaskCompletion(task.id)}
                    >
                      {task.completed ? (
                        <CheckCircle className="task-icon completed" />
                      ) : (
                        <Circle className="task-icon" />
                      )}
                    </button>
                    <div className="task-details">
                      <h4 className="task-title">{task.title}</h4>
                      {task.description && (
                        <p className="task-description">{task.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="task-actions">
                    <button 
                      className="task-action-button"
                      onClick={() => setEditingTask(task)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="task-action-button delete"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
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
      </div>
    </div>
  );
}

export default TaskManagerView;
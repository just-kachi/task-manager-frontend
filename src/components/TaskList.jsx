import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskComments from "./TaskComments";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [filters, setFilters] = useState({ priority: "", category: "" });
  const [sortBy, setSortBy] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditedTask(task);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    fetchTasks();
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:3000/tasks/${editingTaskId}`, editedTask);
    setEditingTaskId(null);
    fetchTasks();
  };

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filters.priority === "" || task.priority === filters.priority) &&
      (filters.category === "" || task.category.toLowerCase().includes(filters.category.toLowerCase()))
    );
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "due_date") {
      return new Date(a.due_date) - new Date(b.due_date);
    }
    if (sortBy === "priority") {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return (
    <div>
      <h2>All Tasks</h2>

      <div className="filter-bar">
        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">Filter by Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          placeholder="Filter by Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="due_date">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {sortedTasks.map((task) => (
        <div key={task.id} className="task-card">
          {editingTaskId === task.id ? (
            <>
              <input
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              />
              <textarea
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              />
              <input
                type="date"
                value={editedTask.due_date}
                onChange={(e) => setEditedTask({ ...editedTask, due_date: e.target.value })}
              />
              <select
                value={editedTask.priority}
                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <input
                value={editedTask.category}
                onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
              />
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingTaskId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due: {task.due_date}</p>
              <p>Priority: {task.priority}</p>
              <p>Category: {task.category}</p>
              <p>Status: {task.status}</p>
              {task.attachment && (
                <p>
                  📎 Attachment:{" "}
                  <a href={`http://localhost:3000/uploads/${task.attachment}`} target="_blank" rel="noreferrer">
                    {task.attachment}
                  </a>
                </p>
              )}
              <button onClick={() => handleEditClick(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
              <TaskComments taskId={task.id} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;

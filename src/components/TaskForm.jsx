import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "Low",
    category: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post("http://localhost:3000/tasks", data);
      onTaskCreated(); // Refresh task list
      setFormData({
        title: "",
        description: "",
        due_date: "",
        priority: "Low",
        category: "",
        attachment: null,
      });
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input name="due_date" type="date" value={formData.due_date} onChange={handleChange} />
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input name="attachment" type="file" onChange={handleChange} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;

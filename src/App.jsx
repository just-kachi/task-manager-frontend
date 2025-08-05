import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleTaskCreated = () => {
    setRefresh(!refresh); // Trigger re-render
  };

  return (
    <div className={darkMode ? "App dark" : "App"}>
      <h1>Task Manager</h1>

      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          marginBottom: "20px",
          padding: "6px 12px",
          cursor: "pointer",
          borderRadius: "6px",
          border: "none",
          backgroundColor: darkMode ? "#444" : "#3b7ddd",
          color: "white",
        }}
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList key={refresh} />
    </div>
  );
}

export default App;

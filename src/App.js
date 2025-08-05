import React, { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTaskCreated = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Task Manager</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList key={refresh} />
    </div>
  );
}

export default App;

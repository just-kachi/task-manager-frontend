import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskComments = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/tasks/${taskId}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    await axios.post(`http://localhost:3000/tasks/${taskId}/comments`, { content: newComment });
    setNewComment("");
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div style={{ marginTop: "10px" }}>
      <h4>Comments</h4>
      {comments.map((c) => (
        <p key={c.id}>– {c.content}</p>
      ))}
      <input
        value={newComment}
        placeholder="Add a comment"
        onChange={(e) => setNewComment(e.target.value)}
        style={{ width: "80%" }}
      />
      <button onClick={handleAddComment}>Send</button>
    </div>
  );
};

export default TaskComments;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import "../styles/task.css";
import Navbar from "../components/Navbar";

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [form, setForm] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskRes = await API.get(`/tasks/${id}/`);
        const commentRes = await API.get(`/tasks/${id}/comments/`);
        setTask(taskRes.data);
        setForm(taskRes.data);
        setComments(commentRes.data);
      } catch (err) {
        alert("Failed to load task or comments");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.patch(`/tasks/${id}/update/`, form);
      alert("Task updated!");
      setTask(res.data);
    } catch (err) {
      alert("Failed to update task.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}/delete/`);
      alert("Task deleted.");
      navigate("/");
    } catch (err) {
      alert("Failed to delete task.");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await API.post(`/tasks/${id}/comments/`, {
        content: newComment,
      });
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (err) {
      alert("Failed to post comment");
    }
  };

  return (
    <>
      
      <div className="container">
        <h2>Task Details</h2>

        {task && (
          <form className="task-form" onSubmit={handleUpdate}>
            <label>Title</label>
            <input
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              required
            />

            <label>Description</label>
            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              rows="3"
            />

            <label>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="TODO">To Do</option>
              <option value="INPROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>

            <label>Due Date</label>
            <input
              type="date"
              name="due_date"
              value={form.due_date || ""}
              onChange={handleChange}
            />

            <div className="form-actions">
              <button type="submit">Update Task</button>
              <button
                type="button"
                onClick={handleDelete}
                className="danger"
              >
                Delete Task
              </button>
            </div>
          </form>
        )}

        <div className="comments">
          <h3>Comments</h3>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul>
              {comments.map((c) => (
                <li key={c.id}>
                  <strong>{c.user_username}</strong>: {c.content}{" "}
                  <em>({new Date(c.timestamp).toLocaleString()})</em>
                </li>
              ))}
            </ul>
          )}
          <form className="comment-form" onSubmit={handleAddComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows="3"
            />
            <button type="submit">Post Comment</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TaskDetail;

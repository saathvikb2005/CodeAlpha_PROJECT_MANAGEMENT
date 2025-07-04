// src/pages/CreateTask.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import "../styles/task.css";

const STATUS_MAP = {
  "To-Do": "TODO",
  "In-Progress": "INPROGRESS",
  "Done": "DONE",
};

function CreateTask() {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "To-Do",
    assigned_to: "",
    due_date: "",
  });
  const [members, setMembers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/projects/${projectId}/`);
        setMembers(res.data.members || []);
      } catch (err) {
        console.error("Error loading members:", err);
        alert("Failed to load members");
      }
    })();
  }, [projectId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: form.title,
        description: form.description,
        status: STATUS_MAP[form.status],
        assigned_to: form.assigned_to || null,
        due_date: form.due_date || null,
      };
      await API.post(`/tasks/${projectId}/create/`, payload);
      alert("Task created!");
      navigate(`/project/${projectId}`);
    } catch (err) {
      console.error("Task creation failed:", err.response?.data || err.message);
      alert("Failed to create task");
    }
  };

  return (
    <div className="task-container">
      <div className="task-banner">
        <div className="task-text">
          <h1>Create a Task</h1>
          <p>Organize work, assign responsibilities, and meet deadlines with ease.</p>
        </div>
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.YjSY26akx4cTAOXUsowOxwHaBz&pid=Api&P=0&h=180"
          alt="task-banner"
          className="task-image"
        />
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          placeholder="Task Title"
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Describe the task..."
          onChange={handleChange}
          rows="3"
        />
        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          {Object.entries(STATUS_MAP).map(([label, val]) => (
            <option key={val} value={label}>
              {label}
            </option>
          ))}
        </select>
        <label>Assign To</label>
        <select
          name="assigned_to"
          value={form.assigned_to}
          onChange={handleChange}
        >
          <option value="">-- Select Member --</option>
          {members.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>
        <label>Due Date</label>
        <input type="date" name="due_date" onChange={handleChange} />
        <button className="submit-btn" type="submit">
          ✅ Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;

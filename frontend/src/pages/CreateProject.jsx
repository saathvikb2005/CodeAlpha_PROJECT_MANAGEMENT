// src/pages/CreateProject.jsx
import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/project.css";

function CreateProject() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [emails, setEmails] = useState([""]);
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmailChange = (index, value) => {
    const updated = [...emails];
    updated[index] = value;
    setEmails(updated);
  };

  const handleAddEmail = () => {
    setEmails([...emails, ""]);
  };

  const handleRemoveEmail = (index) => {
    const updated = [...emails];
    updated.splice(index, 1);
    setEmails(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/projects/create/", form);
      const projectId = res.data.id;
      for (let email of emails) {
        if (email.trim()) {
          await API.post(`/projects/${projectId}/add-member/`, {
            username_or_email: email.trim(),
          });
        }
      }
      alert("Project created!");
      navigate(`/project/${projectId}`);
    } catch (err) {
      console.error("Project creation failed:", err);
      alert("Failed to create project");
    }
  };

  return (
    <div className="project-container">
      <div className="hero">
        <div className="hero-text">
          <h1>Create a New Project</h1>
          <p>Set up your project and invite collaborators instantly.</p>
        </div>
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.BYcaLQWJLRwvkmhUu533ngHaEK&pid=Api&P=0&h=180"
          alt="Create Project"
          className="hero-image"
        />
      </div>

      <form className="project-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleFormChange}
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleFormChange}
          rows="3"
        />

        <div className="member-inputs">
          <label>Project Members (Emails or Usernames):</label>
          {emails.map((email, index) => (
            <div className="email-field" key={index}>
              <input
                type="text"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                placeholder={`Member ${index + 1}`}
              />
              {emails.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemoveEmail(index)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={handleAddEmail}>
            + Add Another Member
          </button>
        </div>

        <button type="submit" className="submit-btn">
          🚀 Create Project
        </button>
      </form>
    </div>
  );
}

export default CreateProject;

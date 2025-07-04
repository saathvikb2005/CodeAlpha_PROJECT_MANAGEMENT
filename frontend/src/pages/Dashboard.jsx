// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects/");
        setProjects(res.data);
      } catch (err) {
        console.error("Not authenticated or error fetching projects.");
        navigate("/login");
      }
    };
    fetchProjects();
  }, [navigate]);

  const handleProjectClick = (id) => {
    navigate(`/project/${id}`);
  };

  const handleCreateProject = () => {
    navigate("/create-project");
  };

  return (
    <div className="dashboard-container">
      <div className="hero">
        <div className="hero-text">
          <h1>Welcome to Your Project Dashboard</h1>
          <p>Organize, collaborate, and manage your team projects seamlessly.</p>
          <button onClick={handleCreateProject}>+ New Project</button>
        </div>
        <img
          src="https://static.vecteezy.com/system/resources/previews/005/124/606/large_2x/businessman-hand-project-manager-working-and-update-tasks-with-milestones-progress-planning-and-gantt-chart-scheduling-virtual-diagram-photo.jpg"
          alt="Project Management"
          className="hero-image"
        />
      </div>

      <h2 className="section-title">Your Projects</h2>
      {projects.length === 0 ? (
        <p className="empty-text">No projects found. Start by creating one!</p>
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => handleProjectClick(project.id)}
            >
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

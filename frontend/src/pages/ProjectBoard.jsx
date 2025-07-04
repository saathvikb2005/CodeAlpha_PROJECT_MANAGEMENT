import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import "../styles/board.css";

function ProjectBoard() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      const res = await API.get(`/projects/${id}/`);
      setProject(res.data);
      setTasks(res.data.tasks || []);
    } catch (err) {
      alert("Failed to load project");
      navigate("/");
    }
  };

  const handleCreateTask = () => navigate(`/project/${id}/create-task`);

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await API.delete(`/tasks/${taskId}/delete/`);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await API.patch(`/tasks/${taskId}/update/`, { status: newStatus });
      loadProject(); // refresh
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="container">
      <div className="project-header">
        <div>
          <h2>{project?.name}</h2>
          <p>{project?.description}</p>
        </div>
        <button onClick={handleCreateTask} className="create-btn">
          + New Task
        </button>
      </div>
      <div className="board">
        {["TODO", "INPROGRESS", "DONE"].map((statusKey) => (
          <div key={statusKey} className={`column ${statusKey.toLowerCase()}`}>
            <h3>
              {statusKey === "TODO"
                ? "To-Do"
                : statusKey === "INPROGRESS"
                ? "In Progress"
                : "Done"}
            </h3>
            {tasks
              .filter((t) => t.status === statusKey)
              .map((task) => (
                <div key={task.id} className="task-card">
                  <h4 onClick={() => navigate(`/task/${task.id}`)}>{task.title}</h4>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  >
                    <option value="TODO">To-Do</option>
                    <option value="INPROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </select>
                  <div className="task-actions">
                    <button onClick={() => navigate(`/task/${task.id}`)}>View</button>
                    <button onClick={() => handleDelete(task.id)} className="danger">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectBoard;

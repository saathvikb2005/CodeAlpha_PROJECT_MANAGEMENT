// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectBoard from "./pages/ProjectBoard";
import TaskDetail from "./pages/TaskDetail";
import CreateProject from "./pages/CreateProject";
import CreateTask from "./pages/CreateTask";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/create-project" element={<PrivateRoute><CreateProject /></PrivateRoute>} />
        <Route path="/project/:id" element={<PrivateRoute><ProjectBoard /></PrivateRoute>} />
        <Route path="/project/:id/create-task" element={<PrivateRoute><CreateTask /></PrivateRoute>} />
        <Route path="/task/:id" element={<PrivateRoute><TaskDetail /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;

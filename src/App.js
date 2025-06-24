import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Dashboard, Projects, Issues, CreateProject, Reports, BoardPage } from './pages';
import { ProjectsProvider } from './context/ProjectsContext';

function App() {
  return (
    <ProjectsProvider>
      <Router>
        <Sidebar />
        <div style={{ marginLeft: 0, paddingTop: 0 }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </ProjectsProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Dashboard, Projects, Issues, CreateProject, Reports, BoardPage } from './pages';
import { ProjectsProvider } from './context/ProjectsContext';

function App() {
  return (
    <ProjectsProvider>
      <BrowserRouter basename="/kanban_board_frontend">
        <Sidebar />
        <div style={{ marginLeft: 0, paddingTop: 0 }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/edit-project/:id" element={<CreateProject />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ProjectsProvider>
  );
}

export default App;

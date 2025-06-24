import { useState, useEffect } from 'react';
import { fetchProjects, createProject, updateProject, deleteProject } from '../utils/api';

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all projects
  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await fetchProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  // Load projects on mount
  useEffect(() => {
    loadProjects();
  }, []);

  // Create a new project
  const addProject = async (projectData) => {
    try {
      setLoading(true);
      const newProject = await createProject(projectData);
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      setError(err.message || 'Failed to create project');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing project
  const editProject = async (projectId, projectData) => {
    try {
      setLoading(true);
      const updatedProject = await updateProject(projectId, projectData);
      setProjects(prev => 
        prev.map(project => 
          project._id === projectId ? updatedProject : project
        )
      );
      return updatedProject;
    } catch (err) {
      setError(err.message || 'Failed to update project');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a project
  const removeProject = async (projectId) => {
    try {
      setLoading(true);
      await deleteProject(projectId);
      setProjects(prev => prev.filter(project => project._id !== projectId));
    } catch (err) {
      setError(err.message || 'Failed to delete project');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    addProject,
    editProject,
    removeProject,
    refreshProjects: loadProjects
  };
} 
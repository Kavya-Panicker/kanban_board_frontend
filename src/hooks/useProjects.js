import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../utils/api';

const normalizeStatus = (status) => {
  if (!status) return 'todo';
  
  const normalized = status.toLowerCase().trim();
  
  // Handle various status formats
  switch (normalized) {
    case 'to-do':
    case 'to do':
    case 'not started':
      return 'todo';
    case 'in progress':
    case 'in-progress':
      return 'inprogress';
    case 'completed':
    case 'finish':
    case 'finished':
      return 'done';
    default:
      return normalized;
  }
};

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all projects
  const loadProjects = async () => {
    try {
      console.log('Loading projects...');
      setLoading(true);
      const data = await getProjects();
      console.log('Raw projects data:', data);
      
      // Normalize status for each project
      const processedData = data.map(project => {
        console.log('Processing project:', project);
        console.log('Project team:', project.team);
        return {
          ...project,
          status: normalizeStatus(project.status),
          team: Array.isArray(project.team) ? project.team : [project.team].filter(Boolean)
        };
      });
      
      console.log('Processed projects:', processedData);
      setProjects(processedData);
      setError(null);
    } catch (err) {
      console.error('Error in loadProjects:', err);
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
      const newProject = await createProject({
        ...projectData,
        status: normalizeStatus(projectData.status),
        team: Array.isArray(projectData.team) ? projectData.team : [projectData.team].filter(Boolean)
      });
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
      const updatedProject = await updateProject(projectId, {
        ...projectData,
        status: normalizeStatus(projectData.status),
        team: Array.isArray(projectData.team) ? projectData.team : [projectData.team].filter(Boolean)
      });
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
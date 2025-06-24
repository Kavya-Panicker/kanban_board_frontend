import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

// Tasks endpoints
export const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks');
    console.log('Fetched tasks:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const addTask = async (taskData) => {
  try {
    // Ensure the data matches the backend model exactly
    const formattedTask = {
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      start_date: new Date(taskData.start_date).toISOString().split('T')[0],
      end_date: new Date(taskData.end_date).toISOString().split('T')[0],
      assigned_to: taskData.assigned_to
    };

    console.log('Sending task data:', formattedTask);
    const response = await api.post('/tasks', formattedTask);
    console.log('Task created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const formattedTask = {
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      start_date: new Date(taskData.start_date).toISOString().split('T')[0],
      end_date: new Date(taskData.end_date).toISOString().split('T')[0],
      assigned_to: taskData.assigned_to
    };

    const response = await api.put(`/tasks/${taskId}`, formattedTask);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

// Projects endpoints
export const fetchProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    // Format the date to YYYY-MM-DD
    const formattedData = {
      ...projectData,
      dueDate: new Date(projectData.dueDate).toISOString().split('T')[0]
    };
    
    console.log('Sending project data:', formattedData);
    const response = await api.post('/projects', formattedData);
    console.log('Project created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const formattedData = {
      ...projectData,
      dueDate: new Date(projectData.dueDate).toISOString().split('T')[0]
    };
    const response = await api.put(`/projects/${projectId}`, formattedData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
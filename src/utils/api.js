import axios from 'axios';

const API_BASE_URL = 'https://kanban-api-ztcb.onrender.com/'
const api = axios.create({
  baseURL: API_BASE_URL,
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

// PROJECTS API
export async function createProject(projectData) {
  // Ensure dueDate is an ISO string
  const data = { ...projectData, dueDate: new Date(projectData.dueDate).toISOString() };
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create project');
  return response.json();
}

export async function getProjects() {
  try {
    console.log('Fetching projects...');
    const response = await fetch(`${API_BASE_URL}/projects`);
    console.log('Projects API Response:', response);
    
    if (!response.ok) {
      console.error('Failed to fetch projects:', response.status, response.statusText);
      throw new Error('Failed to fetch projects');
    }
    
    const data = await response.json();
    console.log('Projects data received:', data);
    return data;
  } catch (error) {
    console.error('Error in getProjects:', error);
    throw error;
  }
}

export async function updateProject(id, projectData) {
  const data = { ...projectData, dueDate: new Date(projectData.dueDate).toISOString() };
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update project');
  return response.json();
}

export async function deleteProject(id) {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete project');
  return response.json();
}

// TASKS API
export async function createTask(taskData) {
  // Ensure start_date and end_date are ISO strings
  const data = {
    ...taskData,
    start_date: new Date(taskData.start_date).toISOString(),
    end_date: new Date(taskData.end_date).toISOString(),
  };
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
}

export async function getTasks() {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
}

export async function updateTask(id, taskData) {
  const data = {
    ...taskData,
    start_date: new Date(taskData.start_date).toISOString(),
    end_date: new Date(taskData.end_date).toISOString(),
  };
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete task');
  return response.json();
}
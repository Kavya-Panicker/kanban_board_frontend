import { createProject } from './api';

// Test project data
const testProject = {
  name: "Test Project",
  description: "This is a test project",
  status: "Planning",
  progress: 0,
  team: ["Test User"],
  dueDate: new Date().toISOString().split('T')[0],
  priority: "Medium"
};

// Test the API connection
console.log('Testing API connection...');
console.log('Sending test project:', testProject);

createProject(testProject)
  .then(response => {
    console.log('Success! Project created:', response);
  })
  .catch(error => {
    console.error('API Test Failed:', error);
    if (error.response) {
      console.error('Error Response:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('No response received. Is the backend running?');
    } else {
      console.error('Error:', error.message);
    }
  }); 
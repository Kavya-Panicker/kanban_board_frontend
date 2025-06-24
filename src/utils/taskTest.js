import { addTask } from './api';

// Test task data matching the exact backend model structure
const testTask = {
  title: "New Task",
  description: "Some description",
  status: "To Do",
  start_date: "2025-06-25",
  end_date: "2025-06-30",
  assigned_to: "@Kavya"
};

// Test the task creation
console.log('Testing task creation...');
console.log('Sending test task:', testTask);

addTask(testTask)
  .then(response => {
    console.log('Success! Task created:', response);
  })
  .catch(error => {
    console.error('Task Creation Failed:', error);
    if (error.response) {
      console.error('Error Response:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('No response received. Is the backend running?');
    } else {
      console.error('Error:', error.message);
    }
  }); 
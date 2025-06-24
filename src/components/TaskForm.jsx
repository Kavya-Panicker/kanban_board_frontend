import React, { useState } from 'react';
import { addTask } from '../utils/api';
import styles from './TaskForm.module.css';

const TaskForm = ({ onTaskAdded }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'To Do',
    start_date: '',
    end_date: '',
    assigned_to: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Sending this task to backend:", taskData);

    try {
      const res = await addTask(taskData);
      console.log("✅ Task added successfully:", res);
      
      // Reset form
      setTaskData({
        title: '',
        description: '',
        status: 'To Do',
        start_date: '',
        end_date: '',
        assigned_to: ''
      });
      
      // Notify parent component
      if (onTaskAdded) {
        onTaskAdded(res);
      }
    } catch (err) {
      console.error("❌ Error adding task:", err.response?.data || err.message);
      alert('Failed to add task. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`🔄 Updating ${name} field to:`, value);
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={taskData.status}
          onChange={handleChange}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="start_date">Start Date:</label>
        <input
          type="date"
          id="start_date"
          name="start_date"
          value={taskData.start_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="end_date">End Date:</label>
        <input
          type="date"
          id="end_date"
          name="end_date"
          value={taskData.end_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="assigned_to">Assigned To:</label>
        <input
          type="text"
          id="assigned_to"
          name="assigned_to"
          value={taskData.assigned_to}
          onChange={handleChange}
          placeholder="@username"
          required
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm; 
import React, { useState } from 'react';
import styles from './Projects.module.css';
import { useNavigate } from 'react-router-dom';
import useProjects from '../../hooks/useProjects';

const Projects = () => {
  const { projects, loading, error } = useProjects();
  const navigate = useNavigate();

  // Filter state
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done': return '#10b981';
      case 'In Progress': return '#3b82f6';
      case 'To Do': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusDisplay = (status) => {
    if (status === 'todo') return 'To Do';
    if (status === 'inprogress') return 'In Progress';
    if (status === 'done') return 'Done';
    return status;
  };

  // Filtering logic
  const filteredProjects = projects.filter(project => {
    const status = (project.status || '').toLowerCase();
    const priority = (project.priority || '').toLowerCase();
    const statusMatch = !statusFilter || status === statusFilter;
    const priorityMatch = !priorityFilter || priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.projects}>
      <div className={styles.header}>
        <h1>Projects</h1>
        <button className={styles.addButton} onClick={() => navigate('/create-project')}>
          <span>➕</span>
          New Project
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Status:</label>
          <select className={styles.filterSelect} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label>Priority:</label>
          <select className={styles.filterSelect} value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <div className={styles.projectsGrid}>
        {filteredProjects.map((project) => (
          <div key={project._id || project.id} className={styles.projectCard}>
            <div className={styles.projectHeader}>
              <h3>{project.name}</h3>
              <div className={styles.projectMeta}>
                <span 
                  className={styles.status}
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {getStatusDisplay(project.status)}
                </span>
                <span 
                  className={styles.priority}
                  style={{ backgroundColor: getPriorityColor(project.priority) }}
                >
                  {project.priority}
                </span>
              </div>
            </div>
            
            <p className={styles.description}>{project.description}</p>
            
            <div className={styles.progressSection}>
              <div className={styles.progressHeader}>
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className={styles.projectDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Team:</span>
                <div className={styles.teamMembers}>
                  {project.team.map((member, index) => (
                    <span key={index} className={styles.member}>
                      {member}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Due Date:</span>
                <span className={styles.dueDate}>{project.dueDate}</span>
              </div>
            </div>
            
            <div className={styles.projectActions}>
              <button className={styles.actionButton}>View Details</button>
              <button 
                className={styles.actionButton}
                onClick={() => navigate(`/edit-project/${project._id || project.id}`)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 
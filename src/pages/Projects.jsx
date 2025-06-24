import React, { useState } from 'react';
import styles from './Projects.module.css';
import useProjects from '../hooks/useProjects';

const Projects = () => {
  const { projects, loading, error, addProject, editProject, removeProject } = useProjects();
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Planning',
    progress: 0,
    team: [],
    dueDate: '',
    priority: 'Medium'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await editProject(editingProject._id, formData);
      } else {
        await addProject(formData);
      }
      setShowModal(false);
      setEditingProject(null);
      setFormData({
        name: '',
        description: '',
        status: 'Planning',
        progress: 0,
        team: [],
        dueDate: '',
        priority: 'Medium'
      });
    } catch (err) {
      console.error('Failed to save project:', err);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      status: project.status,
      progress: project.progress,
      team: project.team,
      dueDate: project.dueDate,
      priority: project.priority
    });
    setShowModal(true);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await removeProject(projectId);
      } catch (err) {
        console.error('Failed to delete project:', err);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#10b981';
      case 'In Progress': return '#3b82f6';
      case 'Planning': return '#f59e0b';
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

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.projects}>
      <div className={styles.header}>
        <h1>Projects</h1>
        <button 
          className={styles.addButton}
          onClick={() => {
            setEditingProject(null);
            setFormData({
              name: '',
              description: '',
              status: 'Planning',
              progress: 0,
              team: [],
              dueDate: '',
              priority: 'Medium'
            });
            setShowModal(true);
          }}
        >
          <span>➕</span>
          New Project
        </button>
      </div>

      {/* Project Modal */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{editingProject ? 'Edit Project' : 'New Project'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Description:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Status:</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Progress:</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Due Date:</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Priority:</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Team Members (comma-separated):</label>
                <input
                  type="text"
                  value={formData.team.join(', ')}
                  onChange={(e) => setFormData({...formData, team: e.target.value.split(',').map(m => m.trim())})}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit">{editingProject ? 'Save Changes' : 'Create Project'}</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <div key={project._id} className={styles.projectCard}>
            <div className={styles.projectHeader}>
              <h3>{project.name}</h3>
              <div className={styles.projectMeta}>
                <span 
                  className={styles.status}
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {project.status}
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
              <button 
                className={styles.actionButton}
                onClick={() => handleEdit(project)}
              >
                Edit
              </button>
              <button 
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => handleDelete(project._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 
import React, { useState, useEffect } from 'react';
import styles from './CreateProject.module.css';
import { useProjects } from '../../context/ProjectsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { createProject, updateProject, getProjects, deleteProject } from '../../utils/api';

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const priorityOptions = [
  'Low', 'Medium', 'High', 'Critical'
];

const CreateProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    endDate: '',
    priority: 'Medium',
    teamMembers: [],
    status: 'todo',
    progress: 0,
  });
  const [teamMember, setTeamMember] = useState('');
  const { addProject, editProject, removeProject } = useProjects();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      // Fetch the project and pre-fill the form
      getProjects().then(projects => {
        const project = projects.find(p => p._id === id || p.id === id);
        if (project) {
          setFormData({
            name: project.name || '',
            description: project.description || '',
            endDate: project.dueDate || project.end_date || '',
            priority: project.priority || 'Medium',
            teamMembers: Array.isArray(project.team) ? project.team : [],
            status: (project.status || 'todo').toLowerCase(),
            progress: project.progress || 0,
          });
        }
      });
    }
  }, [id, isEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTeamMember = () => {
    if (teamMember.trim() && !formData.teamMembers.includes(teamMember.trim())) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, teamMember.trim()]
      }));
      setTeamMember('');
    }
  };

  const removeTeamMember = (index) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        status: formData.status,
        progress: Number(formData.progress),
        team: formData.teamMembers,
        dueDate: formData.endDate,
        priority: formData.priority,
      };
      if (isEdit) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }
      navigate('/dashboard');
    } catch (error) {
      alert('Error saving project: ' + error.message);
    }
  };

  // Delete handler
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        await deleteProject(id);
        navigate('/dashboard');
      } catch (error) {
        alert('Error deleting project: ' + error.message);
      }
    }
  };

  return (
    <div className={styles.createProject}>
      <div className={styles.header}>
        <h1>{isEdit ? 'Edit Project' : 'Create New Project'}</h1>
        <p>Fill in the details below to {isEdit ? 'edit' : 'create'} your project</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formSection}>
            <h2>Basic Information</h2>
            <div className={styles.formGroup}>
              <label htmlFor="name">Project Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter project name"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your project"
                rows="4"
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="progress">Progress (%)</label>
                <input
                  type="number"
                  id="progress"
                  name="progress"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.formSection}>
            <h2>Project Details</h2>
            <div className={styles.formGroup}>
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                {priorityOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.formSection}>
          <h2>Team Members</h2>
          <div className={styles.teamInput}>
            <input
              type="text"
              value={teamMember}
              onChange={(e) => setTeamMember(e.target.value)}
              placeholder="Enter team member name"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTeamMember())}
            />
            <button 
              type="button" 
              onClick={addTeamMember}
              className={styles.addMemberButton}
            >
              Add Member
            </button>
          </div>
          {formData.teamMembers.length > 0 && (
            <div className={styles.teamMembers}>
              {formData.teamMembers.map((member, index) => (
                <div key={index} className={styles.teamMember}>
                  <span>{member}</span>
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className={styles.removeMemberButton}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.formActions}>
          <button type="button" className={styles.cancelButton} onClick={() => navigate('/dashboard')}>
            Cancel
          </button>
          {isEdit && (
            <button type="button" className={styles.deleteButton} onClick={handleDelete} style={{marginRight: 12, background: '#ef4444', color: 'white'}}>
              Delete Project
            </button>
          )}
          <button type="submit" className={styles.submitButton}>
            {isEdit ? 'Save Changes' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject; 
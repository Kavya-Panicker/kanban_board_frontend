import React, { useState } from 'react';
import styles from './CreateProject.module.css';
import { useProjects } from '../../context/ProjectsContext';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'Medium',
    teamMembers: [],
    budget: '',
    client: ''
  });

  const [teamMember, setTeamMember] = useState('');
  const { addProject } = useProjects();
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject({
      name: formData.name,
      description: formData.description,
      dueDate: formData.endDate,
      priority: formData.priority,
      team: formData.teamMembers,
      client: formData.client,
      budget: formData.budget
    });
    navigate('/dashboard');
  };

  return (
    <div className={styles.createProject}>
      <div className={styles.header}>
        <h1>Create New Project</h1>
        <p>Fill in the details below to create a new project</p>
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
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>

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
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="client">Client</label>
              <input
                type="text"
                id="client"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                placeholder="Enter client name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="budget">Budget</label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Enter budget amount"
                min="0"
              />
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
          <button type="button" className={styles.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={styles.submitButton}>
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject; 
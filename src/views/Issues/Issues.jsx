import React, { useState } from 'react';
import styles from './Issues.module.css';

const Issues = () => {
  const [issues] = useState([
    {
      id: 1,
      title: 'Login page not responsive on mobile',
      description: 'The login form breaks on screens smaller than 768px',
      type: 'Bug',
      priority: 'High',
      status: 'Open',
      assignee: 'John Doe',
      reporter: 'Sarah Wilson',
      createdDate: '2024-01-15',
      project: 'E-commerce Platform'
    },
    {
      id: 2,
      title: 'Add dark mode support',
      description: 'Implement dark theme toggle for better user experience',
      type: 'Feature',
      priority: 'Medium',
      status: 'In Progress',
      assignee: 'Mike Johnson',
      reporter: 'Alex Brown',
      createdDate: '2024-01-10',
      project: 'Mobile App Development'
    },
    {
      id: 3,
      title: 'Payment gateway integration failing',
      description: 'Stripe payment processing returns 500 error',
      type: 'Bug',
      priority: 'Critical',
      status: 'Open',
      assignee: 'David Lee',
      reporter: 'Emily Davis',
      createdDate: '2024-01-20',
      project: 'E-commerce Platform'
    },
    {
      id: 4,
      title: 'Update user documentation',
      description: 'Create comprehensive user guide for new features',
      type: 'Task',
      priority: 'Low',
      status: 'Completed',
      assignee: 'Lisa Chen',
      reporter: 'Tom Anderson',
      createdDate: '2024-01-05',
      project: 'Website Redesign'
    },
    {
      id: 5,
      title: 'Performance optimization needed',
      description: 'Page load times are exceeding 3 seconds',
      type: 'Bug',
      priority: 'High',
      status: 'In Progress',
      assignee: 'Jane Smith',
      reporter: 'John Doe',
      createdDate: '2024-01-18',
      project: 'API Integration'
    }
  ]);

  const getTypeColor = (type) => {
    switch (type) {
      case 'Bug': return '#ef4444';
      case 'Feature': return '#3b82f6';
      case 'Task': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return '#dc2626';
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return '#ef4444';
      case 'In Progress': return '#3b82f6';
      case 'Completed': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className={styles.issues}>
      <div className={styles.header}>
        <h1>Issues</h1>
        <button className={styles.addButton}>
          <span>➕</span>
          Create Issue
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Type:</label>
          <select className={styles.filterSelect}>
            <option value="">All</option>
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
            <option value="task">Task</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label>Priority:</label>
          <select className={styles.filterSelect}>
            <option value="">All</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label>Status:</label>
          <select className={styles.filterSelect}>
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className={styles.issuesList}>
        {issues.map((issue) => (
          <div key={issue.id} className={styles.issueCard}>
            <div className={styles.issueHeader}>
              <div className={styles.issueTitle}>
                <h3>{issue.title}</h3>
                <div className={styles.issueMeta}>
                  <span 
                    className={styles.type}
                    style={{ backgroundColor: getTypeColor(issue.type) }}
                  >
                    {issue.type}
                  </span>
                  <span 
                    className={styles.priority}
                    style={{ backgroundColor: getPriorityColor(issue.priority) }}
                  >
                    {issue.priority}
                  </span>
                  <span 
                    className={styles.status}
                    style={{ backgroundColor: getStatusColor(issue.status) }}
                  >
                    {issue.status}
                  </span>
                </div>
              </div>
              <div className={styles.issueId}>#{issue.id}</div>
            </div>
            
            <p className={styles.description}>{issue.description}</p>
            
            <div className={styles.issueDetails}>
              <div className={styles.detailRow}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Assignee:</span>
                  <span className={styles.detailValue}>{issue.assignee}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Reporter:</span>
                  <span className={styles.detailValue}>{issue.reporter}</span>
                </div>
              </div>
              
              <div className={styles.detailRow}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Project:</span>
                  <span className={styles.detailValue}>{issue.project}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Created:</span>
                  <span className={styles.detailValue}>{issue.createdDate}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.issueActions}>
              <button className={styles.actionButton}>View Details</button>
              <button className={styles.actionButton}>Edit</button>
              <button className={styles.actionButton}>Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Issues; 
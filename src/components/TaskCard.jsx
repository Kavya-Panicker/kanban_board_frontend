import React, { useState } from 'react';
import UserMention from './UserMention';
import styles from './TaskCard.module.css';

const TaskCard = ({ task }) => {
  const [mentioned, setMentioned] = useState(null);
  
  // Debug log for the full task object
  console.log('TaskCard FULL OBJECT:', task);
  
  // Support both 'name' and 'title' for project/task name
  const displayName = task.name || task.title;
  
  // Support both dueDate and end_date
  const dueDate = task.dueDate || task.end_date;
  
  // Debug log for team
  console.log('TaskCard team:', task.team, 'for', displayName);
  
  // Always show team members (for projects)
  const teamMembers = (
    <div className={styles.teamMembers}>
      {Array.isArray(task.team) && task.team.length > 0
        ? task.team.map((member, index) => (
            <span key={index} className={styles.teamMember}>
              {member}
            </span>
          ))
        : <span className={styles.teamMember}>No team assigned</span>
      }
    </div>
  );
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className={styles.taskCard}>
      <div className={styles.taskTitle}>{displayName}</div>
      <div className={styles.taskDetails}>
        <div>
          <strong>Team:</strong>
          {teamMembers}
        </div>
        <div>
          <strong>Due:</strong> {formatDate(dueDate)}
        </div>
        {task.priority && (
          <div>
            <strong>Priority:</strong> 
            <span className={`${styles.priority} ${styles[task.priority?.toLowerCase()]}`}>
              {task.priority}
            </span>
          </div>
        )}
        {typeof task.progress === 'number' && (
          <div>
            <strong>Progress:</strong>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${task.progress}%` }}
              ></div>
              <span className={styles.progressText}>{task.progress}%</span>
            </div>
          </div>
        )}
        <div>
          <strong>Status:</strong> {task.status === 'inprogress' ? 'In Progress' :
            task.status === 'todo' ? 'To Do' :
            task.status === 'done' ? 'Done' :
            task.status}
        </div>
      </div>
      <UserMention onSelect={setMentioned} />
      {mentioned && <div className={styles.mention}>Mentioned: @{mentioned.name}</div>}
    </div>
  );
};

export default TaskCard; 
import React, { useState } from 'react';
import UserMention from './UserMention';
import styles from './TaskCard.module.css';

const TaskCard = ({ task }) => {
  const [mentioned, setMentioned] = useState(null);
  // Support both 'name' and 'title' for project/task name
  const displayName = task.name || task.title;
  // Support both 'team' (array) and 'member' (string)
  const members = Array.isArray(task.team)
    ? task.team.join(', ')
    : (task.member || '');
  // Support both 'status' as string (with various cases)
  const status =
    task.status === 'inprogress' ? 'In Progress' :
    task.status === 'todo' ? 'To Do' :
    task.status === 'done' ? 'Done' :
    task.status;
  return (
    <div className={styles.taskCard}>
      <div className={styles.taskTitle}>{displayName}</div>
      <div className={styles.taskDetails}>
        <div><strong>Members:</strong> {members}</div>
        <div><strong>Due:</strong> {task.dueDate}</div>
        <div><strong>Priority:</strong> <span className={`${styles.priority} ${styles[task.priority?.toLowerCase()]}`}>{task.priority}</span></div>
        <div><strong>Progress:</strong> {task.progress}%</div>
        <div><strong>Status:</strong> {status}</div>
      </div>
      <UserMention onSelect={setMentioned} />
      {mentioned && <div className={styles.mention}>Mentioned: @{mentioned.name}</div>}
    </div>
  );
};

export default TaskCard; 
import React from 'react';
import TaskCard from './TaskCard';
import styles from './KanbanColumn.module.css';
// ... existing code ...
const KanbanColumn = ({ column, tasks }) => {
  return (
    <div className={`${styles.columnContainer} ${styles[column.id]}`}>
      <div className={styles.columnTitle}>{column.title}</div>
      <div className={styles.tasksList}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn; 
import React from 'react';
import TaskCard from './TaskCard';
import styles from './KanbanColumn.module.css';
// ... existing code ...
const KanbanColumn = ({ column, tasks }) => {
  return (
    <div className={`${styles.columnContainer} ${styles[column.id]}`}>
      <div className={styles.columnTitle}>{column.title}</div>
      <div className={styles.tasksList}>
        {tasks.map(item => (
          <TaskCard 
            key={item._id || item.id} 
            task={{
              id: item._id || item.id,
              title: item.name || item.title,
              description: item.description,
              status: item.status,
              dueDate: item.dueDate || item.end_date,
              priority: item.priority,
              progress: item.progress,
              team: item.team
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn; 
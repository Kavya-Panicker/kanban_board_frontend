import React, { useEffect } from 'react';
import KanbanColumn from './KanbanColumn';
import { COLUMNS } from '../utils/constants';
import useTasks from '../hooks/useTasks';
import styles from './KanbanBoard.module.css';

const normalizeStatus = (status) => {
  if (!status) return 'todo';
  
  const normalized = status.toLowerCase().trim();
  
  // Handle various status formats
  switch (normalized) {
    case 'to-do':
    case 'to do':
    case 'not started':
      return 'todo';
    case 'in progress':
    case 'in-progress':
      return 'inprogress';
    case 'completed':
    case 'finish':
    case 'finished':
      return 'done';
    default:
      return normalized;
  }
};

const KanbanBoard = ({ tasks: propTasks }) => {
  const { tasks: hookTasks } = useTasks();
  const tasks = propTasks || hookTasks;

  useEffect(() => {
    if (tasks?.length > 0) {
      console.log('Tasks in KanbanBoard:', tasks);
      const statusCounts = tasks.reduce((acc, task) => {
        const status = normalizeStatus(task.status);
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});
      console.log('Status distribution:', statusCounts);
    }
  }, [tasks]);

  return (
    <div className={styles.boardOuter}>
      <div className={styles.boardContainer}>
        {COLUMNS.map(column => {
          const filteredTasks = tasks?.filter(task => {
            const normalizedStatus = normalizeStatus(task.status);
            console.log(`Task "${task.name}" status: ${task.status} -> normalized: ${normalizedStatus}`);
            return normalizedStatus === column.id;
          }) || [];
          
          return (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={filteredTasks}
            />
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard; 
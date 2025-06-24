import React from 'react';
import KanbanColumn from './KanbanColumn';
import { COLUMNS } from '../utils/constants';
import useTasks from '../hooks/useTasks';
import styles from './KanbanBoard.module.css';

const KanbanBoard = ({ tasks: propTasks }) => {
  const { tasks: hookTasks } = useTasks();
  const tasks = propTasks || hookTasks;
  return (
    <div className={styles.boardOuter}>
      <div className={styles.boardContainer}>
        {COLUMNS.map(column => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks.filter(task => task.status === column.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard; 
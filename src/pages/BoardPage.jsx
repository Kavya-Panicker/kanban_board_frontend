import React from 'react';
import KanbanBoard from '../components/KanbanBoard';
import Timeline from '../components/Timeline';
// ... existing code ...
const BoardPage = () => {
  return (
    <div>
      <KanbanBoard />
      <Timeline tasks={[]} />
    </div>
  );
};

export default BoardPage; 
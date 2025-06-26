import React, { useEffect } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import Timeline from '../components/Timeline';
import Sidebar from '../components/Sidebar';
import styles from './Dashboard.module.css';
import projectStyles from '../views/Projects/Projects.module.css';
import useTasks from '../hooks/useTasks';
import useProjects from '../hooks/useProjects';

const Dashboard = () => {
  const { tasks } = useTasks();
  const { projects, loading, error } = useProjects();

  useEffect(() => {
    console.log('Dashboard - Projects data:', projects);
    if (projects?.length > 0) {
      console.log('First project team:', projects[0].team);
    }
  }, [projects]);

  if (loading) {
    return (
      <div className={styles.dashboard} style={{ background: '#fff' }}>
        <Sidebar />
        <div className={styles.header} style={{ background: '#fff' }}>
          <h1>Dashboard</h1>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboard} style={{ background: '#fff' }}>
        <Sidebar />
        <div className={styles.header} style={{ background: '#fff' }}>
          <h1>Dashboard</h1>
          <p style={{ color: 'red' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  // Issues data from Issues page, mapped for Timeline
  const issues = [
    {
      id: 1,
      title: 'Login page not responsive on mobile',
      status: 'inprogress', // Open -> inprogress
      member: 'John Doe', // assignee
      dueDate: '2024-01-15', // createdDate
      priority: 'High'
    },
    {
      id: 2,
      title: 'Add dark mode support',
      status: 'inprogress', // In Progress -> inprogress
      member: 'Mike Johnson',
      dueDate: '2024-01-10',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'Payment gateway integration failing',
      status: 'inprogress', // Open -> inprogress
      member: 'David Lee',
      dueDate: '2024-01-20',
      priority: 'Critical'
    },
    {
      id: 4,
      title: 'Update user documentation',
      status: 'done', // Completed -> done
      member: 'Lisa Chen',
      dueDate: '2024-01-05',
      priority: 'Low'
    },
    {
      id: 5,
      title: 'Performance optimization needed',
      status: 'inprogress', // In Progress -> inprogress
      member: 'Jane Smith',
      dueDate: '2024-01-18',
      priority: 'High'
    }
  ];

  return (
    <div className={styles.dashboard} style={{ background: '#fff', minHeight: '100vh' }}>
      <Sidebar />
      <div className={styles.header} style={{ background: '#fff' }}>
        <h1>Dashboard</h1>
        <p>Welcome to your task management dashboard</p>
      </div>
      {projects && projects.length > 0 ? (
        <>
          <KanbanBoard tasks={projects} />
          {console.log('Rendering KanbanBoard with projects:', projects)}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px', background: '#fff' }}>
          No projects found. Create a new project to get started.
        </div>
      )}
      <div style={{
        display: 'flex',
        gap: 32,
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        padding: 32,
        margin: '24px auto 0 auto',
        maxWidth: 900,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
        <div style={{ flex: 1, textAlign: 'center', background: '#fff' }}>
          <h3 style={{ color: '#1f2937', fontWeight: 700, fontSize: '1.2rem', marginBottom: 18 }}>Project Status Overview</h3>
          <Timeline tasks={projects} />
        </div>
        <div style={{ flex: 1, textAlign: 'center', background: '#fff' }}>
          <h3 style={{ color: '#1f2937', fontWeight: 700, fontSize: '1.2rem', marginBottom: 18 }}>Issue Status Overview</h3>
          <Timeline tasks={issues} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
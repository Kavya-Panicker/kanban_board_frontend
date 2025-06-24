import React, { createContext, useContext, useState } from 'react';

const ProjectsContext = createContext();

const initialProjects = [
  {
    id: 1,
    name: 'E-commerce Platform',
    description: 'A modern e-commerce platform with payment integration',
    status: 'inprogress',
    progress: 65,
    team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    dueDate: '2024-02-15',
    priority: 'High',
    client: '',
    budget: '',
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application for task management',
    status: 'todo',
    progress: 25,
    team: ['Sarah Wilson', 'Alex Brown'],
    dueDate: '2024-03-20',
    priority: 'Medium',
    client: '',
    budget: '',
  },
  {
    id: 3,
    name: 'Website Redesign',
    description: 'Complete redesign of company website with modern UI/UX',
    status: 'done',
    progress: 100,
    team: ['Emily Davis', 'Tom Anderson'],
    dueDate: '2024-01-30',
    priority: 'Low',
    client: '',
    budget: '',
  },
  {
    id: 4,
    name: 'API Integration',
    description: 'Integration of third-party APIs for data synchronization',
    status: 'inprogress',
    progress: 80,
    team: ['David Lee', 'Lisa Chen'],
    dueDate: '2024-02-28',
    priority: 'High',
    client: '',
    budget: '',
  }
];

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects);

  const addProject = (project) => {
    setProjects(prev => [
      ...prev,
      { ...project, id: Date.now(), status: 'todo', progress: 0 }
    ]);
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectsContext);
} 
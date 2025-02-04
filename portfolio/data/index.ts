import { Project } from '@/types';

export const dummyProjects: Project[] = [
  {
    id: '1',
    title: 'MERN Blog Platform',
    description:
      'A full-stack blog platform with authentication, built using MERN.',
    techStack: ['MongoDB', 'Express', 'React', 'NodeJS'],
    liveLink: 'https://example.com',
    repoLink: 'https://github.com/example/blog-platform',
  },
  {
    id: '2',
    title: 'E-commerce Store',
    description:
      'A MERN stack e-commerce store with Stripe payment integration.',
    techStack: ['MongoDB', 'Express', 'React', 'NodeJS'],
    liveLink: 'https://example.com',
    repoLink: 'https://github.com/example/ecommerce',
  },
  {
    id: '3',
    title: 'Task Manager',
    description:
      'A task management app with JWT authentication and MongoDB storage.',
    techStack: ['MongoDB', 'Express', 'React', 'NodeJS'],
    liveLink: 'https://example.com',
    repoLink: 'https://github.com/example/task-manager',
  },
];

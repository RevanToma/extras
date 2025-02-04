'use client';
import { dummyProjects } from '@/data';
import { PortfolioContextType, Project } from '@/types';
import { createContext, useState, useEffect, ReactNode } from 'react';

export const PortfolioContext = createContext<PortfolioContextType | null>(
  null
);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]),
    [techSkills, setTechSkills] = useState<string[]>([]),
    [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProjects(
        JSON.parse(
          localStorage.getItem('projects') || JSON.stringify(dummyProjects)
        )
      );
      setTechSkills(
        JSON.parse(
          localStorage.getItem('techSkills') ||
            JSON.stringify(['MongoDB', 'Express', 'React', 'NodeJS'])
        )
      );
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }, [projects, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('techSkills', JSON.stringify(techSkills));
    }
  }, [techSkills, isMounted]);

  const addProject = (project: Project) => setProjects([...projects, project]);

  const editProject = (index: number, updatedProject: Project) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = updatedProject;
    setProjects(updatedProjects);
  };

  const deleteProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const addTechSkill = (skill: string) => setTechSkills([...techSkills, skill]);

  const removeTechSkill = (skill: string) => {
    setTechSkills(techSkills.filter((s) => s !== skill));
  };

  if (!isMounted) return null;

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        techSkills,
        addProject,
        editProject,
        deleteProject,
        addTechSkill,
        removeTechSkill,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

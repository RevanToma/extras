"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  repoLink?: string;
};

interface PortfolioContextType {
  projects: Project[];
  techSkills: string[];
  addProject: (project: Project) => void;
  editProject: (index: number, updatedProject: Project) => void;
  deleteProject: (index: number) => void;
  addTechSkill: (skill: string) => void;
  removeTechSkill: (skill: string) => void;
}

export const PortfolioContext = createContext<PortfolioContextType | null>(null);

const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  }
  return defaultValue;
};

interface PortfolioProviderProps {
  children: ReactNode;
}

export function PortfolioProvider({ children }: PortfolioProviderProps) {
  const [projects, setProjects] = useState<Project[]>(() => loadFromLocalStorage("projects", [])),
   [techSkills, setTechSkills] = useState<string[]>(() => loadFromLocalStorage("techSkills", []))

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("techSkills", JSON.stringify(techSkills));
  }, [techSkills]);

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

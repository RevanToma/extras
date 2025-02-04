export type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  repoLink?: string;
};

export interface PortfolioContextType {
  projects: Project[];
  techSkills: string[];
  addProject: (project: Project) => void;
  editProject: (index: number, updatedProject: Project) => void;
  deleteProject: (index: number) => void;
  addTechSkill: (skill: string) => void;
  removeTechSkill: (skill: string) => void;
}

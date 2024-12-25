import { Project } from '../types/project';

const PROJECTS_KEY = 'projects';

export const storage = {
  getProjects: (): Project[] => {
    const projects = localStorage.getItem(PROJECTS_KEY);
    return projects ? JSON.parse(projects) : [];
  },

  saveProject: (project: Project) => {
    const projects = storage.getProjects();
    const updatedProjects = [...projects, project];
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
  },

  updateProject: (updatedProject: Project) => {
    const projects = storage.getProjects();
    const updatedProjects = projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
  },

  deleteProject: (projectId: string) => {
    const projects = storage.getProjects();
    const updatedProjects = projects.filter(project => project.id !== projectId);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
  }
};
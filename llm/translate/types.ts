import { Language } from "../../Neon/index.ts";

export type RolesLLM = 'user' | 'system' | 'assistant';

export type MessageLLM = {
  role: RolesLLM,
  content: string,
}

export interface TranslateCVContentRequest {
  content: CVContentContract;
  languageTarget: Language;
}

export interface CVContentContract {
  description: string;
  studyTitle?: string;
  workItems: WorkItem[];
  EducationItems: SectionItem[];
  ProjectItems: ProjectItem[];
}

export interface SectionItem {
  title: string;
  date: string;
  description: string;
}

export interface WorkItem extends SectionItem {
  companyDescription: string;
  achievements?: string;
}

export interface ProjectItem extends Omit<SectionItem, 'date'> { }

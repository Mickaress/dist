import type { SkillType } from './Filters';
import { ProjectType } from './Project';

export type VacancyType = {
  id: number;
  title: string;
  salary: number;
  responsibilities: string;
  conditions: string;
  requirements: string;
  period: string;
  skills: SkillType[];
  project: Omit<ProjectType, 'conditions' | 'vacancies'>;
};

export type VacancyListType = {
  vacancies: VacancyType[];
  vacancyCount: number;
};

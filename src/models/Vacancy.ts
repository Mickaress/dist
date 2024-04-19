import { ProjectType } from './Project';
import { StateType } from './State';

export type VacancyType = {
  id: number;
  title: string;
  salary: number;
  responsibilities: string;
  conditions: string;
  requirements: string;
  period: string;
  skills: number[];
  project: Omit<ProjectType, 'conditions' | 'vacancies'>;
  state: StateType;
  comment: String;
};

export type VacancyListType = {
  vacancies: VacancyType[];
  vacancyCount: number;
};

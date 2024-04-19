import { StateType } from './State';
import type { SupervisorType } from './User';
import type { VacancyType } from './Vacancy';

export type ProjectType = {
  id: number;
  title: string;
  supervisor: SupervisorType;
  conditions: string;
  description: string;
  goal: string;
  period: string;
  state: StateType;
  payment: boolean;
  views: number;
  skills: number[];
  vacancies: Pick<VacancyType, 'id' | 'title' | 'salary' | 'responsibilities'>[];
};

export type ProjectListType = {
  projects: ProjectType[];
  projectsCount: number;
};

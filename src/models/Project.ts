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
  dateStart: string;
  dateEnd: string;
  state: StateType;
  payment: boolean;
  views: number;
  skills: number[];
  vacancies: VacancyType[];
};

export type ProjectListType = {
  projects: ProjectType[];
  quantity: number;
};

export type ProjectFormType = {
  title: string;
  supervisorId: number | undefined;
  dateStart: string | undefined;
  dateEnd: string | undefined;
  description: string;
  goal: string;
  conditions: string;
};

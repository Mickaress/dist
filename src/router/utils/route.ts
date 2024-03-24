import type { LocationAsRelativeRaw, RouteLocationRaw } from 'vue-router';
import { RouteNames } from '../types/routeNames';

export const vacancyRoute = (vacancyId: number): RouteLocationRaw => {
  return { name: RouteNames.VACANCY_DETAILS, params: { id: vacancyId } };
};

export const projectRoute = (projectId: number): RouteLocationRaw => {
  return { name: RouteNames.PROJECT_DETAILS, params: { id: projectId } };
};

export function toProjectVacancies(projectId: number): LocationAsRelativeRaw {
  const page = 1;
  return {
    name: RouteNames.SUPERVISOR_PROJECT_VACANCIES,
    params: { projectId, page },
  };
}

export const createVacancyRoute = (projectId: number): RouteLocationRaw => {
  return {
    name: RouteNames.SUPERVISOR_VACANCY_PROPOSAL_CREATE,
    params: { id: projectId },
  };
};

import type { RouteLocationRaw } from 'vue-router';
import { RouteNames } from '../types/routeNames';

export const vacancyRoute = (vacancyId: number): RouteLocationRaw => {
  return { name: RouteNames.VACANCY_DETAILS, params: { id: vacancyId } };
};

export const projectRoute = (projectId: number): RouteLocationRaw => {
  return { name: RouteNames.PROJECT_DETAILS, params: { id: projectId } };
};

export const toProjectVacancies = (projectId: number): RouteLocationRaw => {
  return {
    name: RouteNames.SUPERVISOR_PROJECT_VACANCIES,
    params: { projectId },
  };
};

export const toVacancyResponses = (vacancyId: number): RouteLocationRaw => {
  return {
    name: RouteNames.SUPERVISOR_VACANCY_RESPONSES,
    query: { vacancyId: vacancyId, page: 1 },
  };
};

export const createVacancyRoute = (projectId: number): RouteLocationRaw => {
  return {
    name: RouteNames.SUPERVISOR_VACANCY_CREATE,
    params: { id: projectId },
  };
};

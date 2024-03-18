import type { RouteLocationRaw } from 'vue-router';
import { RouteNames } from '../types/routeNames';

export const vacancyRoute = (vacancyId: number): RouteLocationRaw => {
  return { name: RouteNames.VACANCY_DETAILS, params: { id: vacancyId } };
};

export const projectRoute = (projectId: number): RouteLocationRaw => {
  return { name: RouteNames.PROJECT_DETAILS, params: { id: projectId } };
};

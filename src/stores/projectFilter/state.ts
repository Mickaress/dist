import type { FilterType } from '@/models/Filters';

export const DEFAULT_FILTER: FilterType = {
  title: '',
  payment: [],
  skills: [],
  page: 1,
};

export const state = () => ({ ...DEFAULT_FILTER });

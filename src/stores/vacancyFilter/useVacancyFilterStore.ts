import { defineStore } from 'pinia';
import { state, DEFAULT_FILTER } from './state';
import type { FilterType } from '@/models/Filters';

export const useVacancyFilterStore = defineStore('vacancyFilters', {
  state,
  actions: {
    updateFilters(filters: Partial<FilterType>) {
      this.$state = { ...this.$state, ...filters };
    },
    clearFilter() {
      this.$state = { ...DEFAULT_FILTER };
    },
  },
});

import type { FilterType } from '@/models/Filters';
import { defineStore } from 'pinia';
import { DEFAULT_FILTER, state } from './state';

export const useSupervisorProjectFilterStore = defineStore(
  'supervisorProjectFilters',
  {
    state,
    actions: {
      updateFilters(filters: Partial<FilterType>) {
        this.$state = { ...this.$state, ...filters };
      },
      clearFilter() {
        this.$state = { ...DEFAULT_FILTER };
      },
    },
  },
);

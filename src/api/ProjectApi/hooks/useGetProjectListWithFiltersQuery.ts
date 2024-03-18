import { PER_PAGE } from '@/constants';
import { useProjectFilterStore } from '@/stores/projectFilter/useProjectFilterStore';
import { useQuery } from '@tanstack/vue-query';
import { projectApi } from '..';

export const useGetProjectListWithFiltersQuery = () => {
  const projectFilterStore = useProjectFilterStore();
  const filter = projectFilterStore.$state;

  return useQuery({
    queryKey: ['projects', filter],
    queryFn: () => projectApi.getFilteredProjectList(filter, PER_PAGE),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

import { useSupervisorProjectFilterStore } from '@/stores/supervisorProjectFilter/useProjectFilterStore';
import { useQuery } from '@tanstack/vue-query';
import { supervisorApi } from '..';

export const useGetSupervisorProjectsQuery = () => {
  const supervisorProjectFilterStore = useSupervisorProjectFilterStore();
  const filter = supervisorProjectFilterStore.$state;

  return useQuery({
    queryKey: ['supervisor_projects', filter],
    queryFn: () => supervisorApi.getSupervisorProjects(filter),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

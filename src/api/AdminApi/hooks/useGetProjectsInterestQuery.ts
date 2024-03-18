import { useQuery } from '@tanstack/vue-query';
import { adminApi } from '..';

export const useGetProjectsInterestQuery = () => {
  return useQuery({
    queryKey: ['projects_interest'],
    queryFn: () => adminApi.getProjectsInterest(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

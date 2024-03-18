import { useQuery } from '@tanstack/vue-query';
import { candidateApi } from '..';

export const useGetCandidateResponsesQuery = () => {
  return useQuery({
    queryKey: ['responses'],
    queryFn: () => candidateApi.getCandidateResponses(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

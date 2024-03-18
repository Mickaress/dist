import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { candidateApi } from '..';

export const useUpdateCompetenciesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (competencies: string) =>
      candidateApi.updateCompetencies(competencies),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['user']);
    },
  });
};

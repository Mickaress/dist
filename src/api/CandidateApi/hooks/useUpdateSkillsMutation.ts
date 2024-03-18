import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { candidateApi } from '..';

export const useUpdateSkillsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (skillIds: number[]) => candidateApi.updateSkills(skillIds),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['user']);
    },
  });
};

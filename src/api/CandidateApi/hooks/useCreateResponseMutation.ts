import { useMutation } from '@tanstack/vue-query';
import { candidateApi } from '..';

export const useCreateResponseMutation = () => {
  return useMutation({
    mutationFn: (vacancyId: number) => candidateApi.createResponse(vacancyId),
  });
};

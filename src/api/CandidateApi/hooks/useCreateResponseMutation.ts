import { useMutation } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import { candidateApi } from '..';

export const useCreateResponseMutation = () => {
  return useMutation({
    mutationFn: (vacancyId: number) => candidateApi.createResponse(vacancyId),
    onMutate: () => {
      const toastId = toast.loading('Обработка запроса');
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      toast.remove(context?.toastId);
      toast.success('Вы откликнулись на вакансию');
    },
    onError: (error, variables, context) => {
      toast.remove(context?.toastId);
      toast.error('Ошибка сервера');
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import { supervisorApi } from '..';

export const useReviewResponseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ responseId, stateId }: { responseId: number; stateId: number }) =>
      supervisorApi.reviewResponse(responseId, stateId),
    onMutate: () => {
      const toastId = toast.loading('Обработка запроса');
      return { toastId };
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries(['vacancy_responses']);
      toast.remove(context?.toastId);
      toast.success('Вакансия рассмотрена');
    },
    onError: (error, variables, context) => {
      toast.remove(context?.toastId);
      toast.error('Ошибка сервера');
    },
  });
};

import { VacancyFormType } from '@/models/Vacancy';
import { RouteNames } from '@/router/types/routeNames';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { supervisorApi } from '..';

export const useUpdateVacancyMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ vacancyData, vacancyId }: { vacancyData: VacancyFormType; vacancyId: number }) =>
      supervisorApi.updateVacancy(vacancyData, vacancyId),
    onMutate: () => {
      const toastId = toast.loading('Обработка запроса');
      return { toastId };
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries([
        'project_vacancies',
        variables.vacancyData.projectId,
        1,
      ]);
      toast.remove(context?.toastId);
      router.replace({
        name: RouteNames.SUPERVISOR_PROJECT_VACANCIES,
        params: {
          projectId: variables.vacancyData.projectId,
        },
      });
      window.scrollTo({ left: 0, top: 0 });
      toast.success('Вакансия отправлена на рассмотрение');
    },
    onError: (error, variables, context) => {
      toast.remove(context?.toastId);
      toast.error('Ошибка сервера');
    },
  });
};

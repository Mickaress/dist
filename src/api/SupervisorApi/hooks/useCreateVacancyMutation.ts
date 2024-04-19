import { useMutation } from '@tanstack/vue-query';
import { supervisorApi } from '..';

export const useCreateVacancyMutation = () => {
  return useMutation({
    mutationFn: () => supervisorApi.createVacancy(),
  });
};

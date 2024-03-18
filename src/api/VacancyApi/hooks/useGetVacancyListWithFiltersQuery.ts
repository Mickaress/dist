import { PER_PAGE } from '@/constants';
import { useVacancyFilterStore } from '@/stores/vacancyFilter/useVacancyFilterStore';
import { useQuery } from '@tanstack/vue-query';
import { vacancyApi } from '..';

export const useGetVacancyListWithFiltersQuery = () => {
  const vacancyFilterStore = useVacancyFilterStore();
  const filter = vacancyFilterStore.$state;

  return useQuery({
    queryKey: ['vacancies', filter],
    queryFn: () => vacancyApi.getFilteredVacancyList(filter, PER_PAGE),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

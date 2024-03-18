import type { FilterType } from '@/models/Filters';
import type { VacancyListType, VacancyType } from '@/models/Vacancy';
import { axiosInstance } from '../axiosInstance';
import type VacancyApiType from './VacancyApiType';

export default class VacancyApi implements VacancyApiType {
  async getFilteredVacancyList(
    filters: FilterType,
    perPage: number,
  ): Promise<VacancyListType> {
    const searchParams = {
      title: String(filters.title),
      payment: filters.payment,
      skills: filters.skills,
      page: String(filters.page),
      perPage: String(perPage),
    };

    const response = await axiosInstance.get(`vacancies`, {
      params: searchParams,
    });

    return response.data;
  }
  async getSingleVacancy(vacancyId: number): Promise<VacancyType> {
    const response = await axiosInstance.get(`vacancies/${vacancyId}`);

    return response.data;
  }
}

import { ProjectType } from '@/models/Project';
import { SkillOfferListType, VacancyOfferListType } from '@/models/Proposal';
import { axiosInstance } from '../axiosInstance';
import AdminApiType from './AdminApiType';

export default class AdminApi implements AdminApiType {
  async getProjectsInterest(): Promise<ProjectType[]> {
    const response = await axiosInstance.get('/admin/projects');
    return response.data;
  }
  async getSkillOffers(page: number): Promise<SkillOfferListType> {
    const response = await axiosInstance.get('/admin/skills', {
      params: {
        page: page,
      },
    });
    return response.data;
  }

  async reviewSkill(skillId: number, stateId: number): Promise<void> {
    await axiosInstance.patch(`/admin/skill/${skillId}`, {
      stateId: stateId,
    });
  }

  async getVacancyOffers(page: number): Promise<VacancyOfferListType> {
    const response = await axiosInstance.get(`/admin/vacancies`, {
      params: {
        page: page,
      },
    });

    return response.data;
  }

  async reviewVacancy(vacancyId: number, stateId: number): Promise<void> {
    await axiosInstance.patch(`/admin/vacancy/${vacancyId}`, {
      stateId: stateId,
    });
  }
}

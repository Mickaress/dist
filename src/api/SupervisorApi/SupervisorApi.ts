import { ProjectListType, ProjectType } from '@/models/Project';
import { CandidateResponseListType } from '@/models/Proposal';
import { VacancyListType } from '@/models/Vacancy';
import { axiosInstance } from '../axiosInstance';
import SupervisorApiType from './SupervisorType';

export default class SupervisorApi implements SupervisorApiType {
  async getVacancyResponses(
    vacancyId: number,
    stateId: number,
    page: number,
  ): Promise<CandidateResponseListType> {
    const response = await axiosInstance.get(`/supervisor/vacancy/${vacancyId}/responses`, {
      params: {
        stateId: stateId,
        page: page,
      },
    });
    return response.data;
  }

  async reviewResponse(responseId: number, stateId: number) {
    await axiosInstance.patch(`/supervisor/response/${responseId}`, {
      stateId: stateId,
    });
  }

  async getSupervisorProjects(page: number): Promise<ProjectListType> {
    const response = await axiosInstance.get('/supervisor/projects', {
      params: {
        page: page,
      },
    });
    return response.data;
  }

  async createVacancy(): Promise<void> {
    await axiosInstance.post('/supervisor/vacancy/create');
  }

  async getProjectVacancies(projectId: number, page: number): Promise<VacancyListType> {
    const response = await axiosInstance.get('/supervisor/project/vacancies', {
      params: {
        projectId: projectId,
        page: page,
      },
    });
    return response.data;
  }

  async getActiveProjects(): Promise<ProjectType[]> {
    const response = await axiosInstance.get('/supervisor/active/projects');
    return response.data;
  }
}

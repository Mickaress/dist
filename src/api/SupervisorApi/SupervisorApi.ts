import { FilterType } from '@/models/Filters';
import { ProjectListType } from '@/models/Project';
import { axiosInstance } from '../axiosInstance';
import SupervisorApiType from './SupervisorType';

export default class SupervisorApi implements SupervisorApiType {
  async getCandidateResponses(): Promise<ProjectListType> {
    const response = await axiosInstance.get('');
    return response.data;
  }
  async getSupervisorProjects(filter: FilterType): Promise<ProjectListType> {
    const response = await axiosInstance.get('/supervisor/projects', {
      params: {
        page: filter.page,
      },
    });
    return response.data;
  }
  async createVacancyResponse(): Promise<void> {
    await axiosInstance.post('');
  }
}

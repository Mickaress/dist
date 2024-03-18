import type { FilterType } from '@/models/Filters';
import type { ProjectListType, ProjectType } from '@/models/Project';
import { axiosInstance } from '../axiosInstance';
import type ProjectApiType from './ProjectApiType';

export default class ProjectApi implements ProjectApiType {
  async getFilteredProjectList(
    filters: FilterType,
    perPage: number,
  ): Promise<ProjectListType> {
    const searchParams = {
      title: String(filters.title),
      payment: filters.payment,
      skills: filters.skills,
      page: String(filters.page),
      perPage: String(perPage),
    };

    const response = await axiosInstance.get('projects', {
      params: searchParams,
    });

    return response.data;
  }
  async getSingleProject(projectId: number): Promise<ProjectType> {
    const response = await axiosInstance.get(`projects/${projectId}`);

    return response.data;
  }
}

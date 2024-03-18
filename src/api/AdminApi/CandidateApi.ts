import { ProjectType } from '@/models/Project';
import { axiosInstance } from '../axiosInstance';
import AdminApiType from './CandidateApiType';

export default class AdminApi implements AdminApiType {
  async getProjectsInterest(): Promise<ProjectType[]> {
    const response = await axiosInstance.get('/admin/projects');
    return response.data;
  }
}

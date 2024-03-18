import { ProjectType } from '@/models/Project';

export default interface AdminApiType {
  getProjectsInterest(): Promise<ProjectType[]>;
}

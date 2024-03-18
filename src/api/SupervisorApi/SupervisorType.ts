import { FilterType } from '@/models/Filters';
import type { ProjectListType } from '@/models/Project';

export default interface SupervisorApiType {
  createVacancyResponse(): Promise<void>;
  getCandidateResponses(): Promise<ProjectListType>;
  getSupervisorProjects(filter: FilterType): Promise<ProjectListType>;
}

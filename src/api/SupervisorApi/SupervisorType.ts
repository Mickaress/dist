import type { ProjectListType, ProjectType } from '@/models/Project';
import { CandidateResponseListType } from '@/models/Proposal';
import { VacancyFormType, VacancyListType } from '@/models/Vacancy';

export default interface SupervisorApiType {
  createVacancy(vacancyData: VacancyFormType): Promise<void>;
  reviewResponse(responseId: number, stateId: number): Promise<void>;
  closeVacancy(vacancyId: number): Promise<void>;
  closeProject(projectId: number): Promise<void>;
  getVacancyResponses(
    vacancyId: number,
    stateId: number,
    page: number,
  ): Promise<CandidateResponseListType>;
  getSupervisorProjects(page: number): Promise<ProjectListType>;
  getProjectVacancies(projectId: number, page: number): Promise<VacancyListType>;
  getActiveProjects(): Promise<ProjectType[]>;
}

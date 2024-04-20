import { ProjectType } from '@/models/Project';
import { SkillOfferListType, VacancyOfferListType } from '@/models/Proposal';

export default interface AdminApiType {
  getProjectsInterest(): Promise<ProjectType[]>;
  getSkillOffers(page: number): Promise<SkillOfferListType>;
  reviewSkill(skillId: number, stateId: number): Promise<void>;
  getVacancyOffers(page: number): Promise<VacancyOfferListType>;
  reviewVacancy(vacancyId: number, stateId: number, comment: string): Promise<void>;
}

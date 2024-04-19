import { StateType } from './State';
import { CandidateType } from './User';
import { VacancyType } from './Vacancy';

export const enum FilterProposalsBy {
  Review = 'review',
  Approved = 'approved',
  Rejected = 'rejected',
}

export type CandidateResponseType = {
  id: number;
  state: StateType;
  candidate: CandidateType;
};

export type CandidateResponseListType = {
  responses: CandidateResponseType[];
  count: number;
};

export type SkillOfferType = {
  id: number;
  state: StateType;
  name: string;
};

export type SkillOfferListType = {
  skills: SkillOfferType[];
  count: number;
};

export type VacancyOfferListType = {
  vacancies: VacancyType[];
  count: number;
};

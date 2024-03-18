import { CandidateResponseType } from '@/models/Response';

export default interface CandidateApiType {
  //getCandidateSkills(): Promise<SkillType[]>;
  getCandidateResponses(): Promise<CandidateResponseType[]>;
  createResponse(vacancyId: number): Promise<void>;
  updateSkills(skillIds: number[]): Promise<void>;
  updateCompetencies(competencies: string): Promise<void>;
}

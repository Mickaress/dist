import { CandidateResponseType } from '@/models/Response';
import { axiosInstance } from '../axiosInstance';
import CandidateApiType from './CandidateApiType';

export default class CandidateApi implements CandidateApiType {
  async getCandidateResponses(): Promise<CandidateResponseType[]> {
    const response = await axiosInstance.get(`/candidate/responses`);
    return response.data;
  }
  async createResponse(vacancyId: number): Promise<void> {
    await axiosInstance.post(`/candidate/response/${vacancyId}`);
  }
  async updateSkills(skillIds: number[]): Promise<void> {
    await axiosInstance.post(`/candidate/skills`, { skillIds: skillIds });
  }
  async updateCompetencies(competencies: string): Promise<void> {
    await axiosInstance.post(`/candidate/competencies`, {
      competencies: competencies,
    });
  }
  async offerSkill(name: string): Promise<void> {
    await axiosInstance.post('/candidate/offer-skill', {
      name: name,
    });
  }
}

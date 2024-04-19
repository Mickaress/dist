import { AdminType, CandidateType, SupervisorType } from '@/models/User';

export default interface UserApiType {
  auth(): Promise<void>;
  logout(): Promise<void>;
  getUserInfo(): Promise<CandidateType | SupervisorType | AdminType | null>;
}

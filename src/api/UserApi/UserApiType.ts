import {
  AdminType,
  EmployeeCandidateType,
  StudentCandidateType,
  SupervisorType,
} from '@/models/User';

export default interface UserApiType {
  auth(): Promise<void>;
  logout(): Promise<void>;
  getUserInfo(): Promise<
    | StudentCandidateType
    | EmployeeCandidateType
    | SupervisorType
    | AdminType
    | null
  >;
}

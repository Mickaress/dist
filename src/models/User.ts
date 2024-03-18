import { SkillType } from './Filters';

export type UserRole =
  | 'student_candidate'
  | 'employee_candidate'
  | 'supervisor'
  | 'admin';

type SharedUserType = {
  fio: string;
};

// candidate
export type SharedCandidateType = {
  email: string;
  phone: string;
  institute: string;
  skills: SkillType[];
  competencies: string;
};

export type StudentCandidateType = SharedUserType &
  SharedCandidateType & {
    group: string;
    birthday: string;
  };

export type EmployeeCandidateType = SharedUserType &
  SharedCandidateType & {
    post: string;
  };

// supervisor
export type SupervisorType = SharedUserType & {
  email: string;
  phone: string;
};

// admin
export type AdminType = SharedUserType;

export type UserRole = 'student_candidate' | 'employee_candidate' | 'supervisor' | 'admin';

type SharedUserType = {
  id: number;
  fio: string;
};

// candidate
export type CandidateType = SharedUserType & {
  email: string;
  phone: string;
  institute: string;
  skills: number[];
  competencies: string;
  group?: string;
  birthday?: string;
  post?: string;
};

// supervisor
export type SupervisorType = SharedUserType & {
  email: string;
  phone: string;
};

// admin
export type AdminType = SharedUserType;

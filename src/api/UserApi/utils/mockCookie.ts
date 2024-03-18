import { UserRole } from '@/models/User';
import Cookies from 'js-cookie';

const userRoleMap = {
  student_candidate: '1',
  employee_candidate: '2',
  supervisor: '3',
  admin: '4',
};

export const setUserToCookies = (role?: UserRole) => {
  Cookies.remove('token');
  if (!role) return;
  Cookies.set('token', userRoleMap[role]);
};

export function askForUserRole(): UserRole | undefined {
  const isStudentCandidate = window.confirm('Зайти как студент-соискатель?');
  if (isStudentCandidate) return 'student_candidate';

  const isEmployeeCandidate = window.confirm('Зайти как студент-сотрудник?');
  if (isEmployeeCandidate) return 'employee_candidate';

  const isSupervisor = window.confirm('Зайти как руководитель?');
  if (isSupervisor) return 'supervisor';

  const isAdmin = window.confirm('Зайти как администратор?');
  if (isAdmin) return 'admin';

  return undefined;
}

import ContactPage from '@/pages/ContactPage.vue';
import FaqPage from '@/pages/FaqPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProjectDetails from '@/pages/ProjectPage/ProjectDetails.vue';
import ProjectPage from '@/pages/ProjectPage/ProjectPage.vue';
import ProjectVacanciesList from '@/pages/ProjectPage/ProjectVacanciesList.vue';
import ProjectsPage from '@/pages/ProjectsPage.vue';
import UserInfo from '@/pages/UserPage/UserInfo.vue';
import UserPage from '@/pages/UserPage/UserPage.vue';
import ProjectsInterest from '@/pages/UserPage/admin/ProjectsInterest.vue';
import CandidateResponses from '@/pages/UserPage/candidate/CandidateResponses.vue';
import SupervisorProjects from '@/pages/UserPage/supervisor/SupervisorProjects.vue';
import VacanciesPage from '@/pages/VacanciesPage.vue';
import VacancyPage from '@/pages/VacancyPage.vue';
import type { RouteRecordRaw } from 'vue-router';
import { RouteNames } from './types/routeNames';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: VacanciesPage,
    name: RouteNames.VACANCIES,
    meta: {
      title: 'Все вакансии',
      type: ['main-nav', 'mobile-nav'],
      order: 0,
    },
  },
  {
    path: '/vacancy/:id',
    component: VacancyPage,
    name: RouteNames.VACANCY_DETAILS,
    meta: {
      title: 'О вакансии',
    },
  },
  {
    path: '/projects',
    component: ProjectsPage,
    name: RouteNames.PROJECTS,
    meta: {
      title: 'Все НИОКР',
      type: ['main-nav', 'mobile-nav'],
      order: 1,
    },
  },
  {
    path: '/project/:id',
    component: ProjectPage,
    name: RouteNames.PROJECT,
    children: [
      {
        path: '',
        name: RouteNames.PROJECT_DETAILS,
        component: ProjectDetails,
        meta: {
          title: 'О НИОКР',
        },
      },
      {
        path: 'vacancies',
        name: RouteNames.PROJECT_VACANCIES,
        component: ProjectVacanciesList,
        meta: {
          title: 'Список вакансий',
        },
      },
    ],
  },
  {
    path: '/profile',
    component: UserPage,
    name: RouteNames.USER_PAGE,
    meta: {
      title: 'Профиль пользователя',
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: RouteNames.USER_INFO,
        component: UserInfo,
        meta: {
          title: 'Мой профиль',
          type: ['user-nav'],
          order: 0,
        },
      },
      {
        path: 'responses',
        name: RouteNames.RESPONSES,
        component: CandidateResponses,
        meta: {
          title: 'Мои отклики',
          type: ['user-nav'],
          order: 1,
          role: ['student_candidate', 'employee_candidate'],
        },
      },
      {
        path: 'projects',
        name: RouteNames.SUPERVISOR_PROJECTS,
        component: SupervisorProjects,
        meta: {
          title: 'Мои НИОКР',
          type: ['user-nav'],
          order: 1,
          role: ['supervisor'],
        },
      },
      {
        path: 'projects_interest',
        name: RouteNames.PROJECTS_INTEREST,
        component: ProjectsInterest,
        meta: {
          title: 'Заинтересованность в НИОКР',
          type: ['user-nav'],
          order: 1,
          role: ['admin'],
        },
      },
    ],
  },
  {
    path: '/faq',
    component: FaqPage,
    name: RouteNames.FAQ,
    meta: {
      title: 'Вопрос-ответ',
      type: ['main-nav', 'mobile-nav'],
      order: 2,
    },
  },
  {
    path: '/contacts',
    component: ContactPage,
    name: RouteNames.CONTACTS,
    meta: {
      title: 'Контакты',
      type: ['main-nav', 'mobile-nav'],
      order: 3,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
    name: RouteNames.NOT_FOUND,
  },
];

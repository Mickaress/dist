import ContactPage from '@/pages/ContactPage.vue';
import CreateProjectPage from '@/pages/CreateProjectPage.vue';
import CreateVacancyPage from '@/pages/CreateVacancyPage.vue';
import FaqPage from '@/pages/FaqPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProjectDetails from '@/pages/ProjectPage/ProjectDetails.vue';
import ProjectPage from '@/pages/ProjectPage/ProjectPage.vue';
import ProjectVacancyList from '@/pages/ProjectPage/ProjectVacancyList.vue';
import ProjectsPage from '@/pages/ProjectsPage.vue';
import UserInfo from '@/pages/UserPage/UserInfo.vue';
import UserPage from '@/pages/UserPage/UserPage.vue';
import SkillOffers from '@/pages/UserPage/admin/SkillOffers.vue';
import VacancyOffers from '@/pages/UserPage/admin/VacancyOffers.vue';
import CandidateResponses from '@/pages/UserPage/candidate/CandidateResponses.vue';
import SupervisorProjectVacancies from '@/pages/UserPage/supervisor/SupervisorProjectVacancies.vue';
import SupervisorProjects from '@/pages/UserPage/supervisor/SupervisorProjects.vue';
import SupervisorVacancyResponses from '@/pages/UserPage/supervisor/SupervisorVacancyResponses.vue';
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
    path: '/vacancy/create/:id',
    component: CreateVacancyPage,
    name: RouteNames.SUPERVISOR_VACANCY_CREATE,
    meta: {
      title: 'Создать вакансию',
      requiresAuth: true,
      role: ['supervisor'],
    },
  },
  {
    path: '/project/create',
    name: RouteNames.ADMIN_PROJECT_CREATE,
    component: CreateProjectPage,
    meta: {
      title: 'Создать НИОКР',
      requiresAuth: true,
      role: ['admin'],
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
        component: ProjectVacancyList,
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
        path: 'info',
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
          role: ['candidate'],
        },
      },
      {
        path: 'project-vacancies/:projectId?',
        name: RouteNames.SUPERVISOR_PROJECT_VACANCIES,
        component: SupervisorProjectVacancies,
        meta: {
          title: 'Вакансии',
          type: ['user-nav'],
          order: 1,
          role: ['supervisor'],
          links: [],
        },
      },
      {
        path: 'vacancy-responses/:filterBy?',
        name: RouteNames.SUPERVISOR_VACANCY_RESPONSES,
        component: SupervisorVacancyResponses,
        meta: {
          title: 'Отклики',
          role: ['supervisor'],
        },
      },
      {
        path: 'projects',
        name: RouteNames.SUPERVISOR_PROJECTS,
        component: SupervisorProjects,
        meta: {
          title: 'Мои НИОКР',
          type: ['user-nav'],
          order: 2,
          role: ['supervisor'],
        },
      },
      {
        path: 'vacancy-offers',
        name: RouteNames.ADMIN_VACANCY_OFFER,
        component: VacancyOffers,
        meta: {
          title: 'Заявки на вакансии',
          type: ['user-nav'],
          order: 1,
          role: ['admin'],
        },
      },
      {
        path: 'skill-offers',
        name: RouteNames.ADMIN_SKILL_OFFER,
        component: SkillOffers,
        meta: {
          title: 'Заявки на навыки',
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

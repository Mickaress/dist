<script setup lang="ts">
  import { useCreateResponseMutation } from '@/api/CandidateApi/hooks/useCreateResponseMutation';
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import { useGetSingleVacancyQuery } from '@/api/VacancyApi/hooks/useGetSingleVacancyQuery';
  import ProjectListCard from '@/components/project/ProjectListCard.vue';
  import AppList from '@/components/ui/AppList.vue';
  import BaseBreadcrumbs from '@/components/ui/BaseBreadcrumbs.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import GridLayout from '@/components/ui/GridLayout.vue';
  import SkillList from '@/components/ui/SkillList.vue';
  import AuthModal from '@/components/ui/modal/AuthModal.vue';
  import { RouteNames } from '@/router/types/routeNames';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const vacancyId = Number(route.params.id);

  const { data: vacancy, isFetching, isError } = useGetSingleVacancyQuery(vacancyId);

  const { mutate: createResponse } = useCreateResponseMutation();

  const isShowModal = ref<boolean>(false);

  const { data: userData } = useGetUserInfoQuery();

  const response = (id: number) => {
    if (!userData.value) {
      isShowModal.value = true;
      return;
    }

    createResponse(id);
  };
</script>

<template>
  <div class="content">
    <BaseStub v-if="isFetching" title="Загрузка..."></BaseStub>
    <BaseStub v-if="isError" title="Ошибка сервера"></BaseStub>
    <template v-if="vacancy">
      <BaseBreadcrumbs
        :breadcrumbs="[
          { title: 'Все вакансии', to: { name: RouteNames.VACANCIES } },
          { title: vacancy.title || '' },
        ]"
      />
      <header class="header">
        <h1>{{ vacancy.title }}</h1>
        <template v-if="userData && userData.id !== vacancy.project.supervisor.id">
          <BaseButton @click="response(vacancy.id)">Откликнуться</BaseButton>
        </template>
      </header>
      <BasePanel>
        <GridLayout cols="2fr 1fr 1fr 1fr">
          <AppList
            :items="[
              {
                title: 'Оплата',
                content: vacancy.salary === 0 ? 'Без оплаты' : `${vacancy.salary} ₽`,
              },
              {
                title: 'Период работы',
                content: `${vacancy.period}`,
              },
              {
                title: 'Условия труда',
                content: `${vacancy.conditions}`,
              },
              {
                title: 'Руководитель',
                content: `${vacancy.project.supervisor.fio}`,
              },
              {
                title: 'Контакты руководителя',
                content: `${vacancy.project.supervisor.email} ${vacancy.project.supervisor.phone}`,
              },
            ]"
          />
          <div class="info">
            <h1>Требуемые навыки:</h1>
            <SkillList isVisible :skill-ids="vacancy.skills" />
          </div>
          <div class="info">
            <h1>Обязанности:</h1>
            <p>{{ vacancy.responsibilities }}</p>
          </div>
          <div class="info">
            <h1>Требования:</h1>
            <p>{{ vacancy.requirements }}</p>
          </div>
        </GridLayout>
      </BasePanel>
      <footer class="footer">
        <ProjectListCard :project="vacancy.project" />
        <BaseButton variant="text" @click="$router.push({ name: RouteNames.VACANCIES })">
          Назад к списку
        </BaseButton>
      </footer>
      <AuthModal v-model:isShow="isShowModal" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .content {
    margin-top: 2rem;
  }
  .status {
    margin-top: 2rem;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-size: 2.25rem;
      font-weight: bold;
      margin-top: 1.6875rem;
      margin-bottom: 1.875rem;
    }
  }

  .info {
    h1 {
      font-weight: normal;
      font-size: 1.125rem;
      margin-bottom: 0.625rem;
    }
    p {
      font-size: 1.125rem;
      font-weight: bold;
    }
  }

  .footer {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.25rem;
  }
</style>

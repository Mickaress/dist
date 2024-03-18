<script setup lang="ts">
  import { useGetSingleVacancyQuery } from '@/api/VacancyApi/hooks/useGetSingleVacancyQuery';
  import ProjectListCard from '@/components/project/ProjectListCard.vue';
  import AppList from '@/components/ui/AppList.vue';
  import BaseBreadcrumbs from '@/components/ui/BaseBreadcrumbs.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import GridLayout from '@/components/ui/GridLayout.vue';
  import TagList from '@/components/ui/TagList.vue';
  import { RouteNames } from '@/router/types/routeNames';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const vacancyId = Number(route.params.id);

  const vacancyQuery = useGetSingleVacancyQuery(vacancyId);
</script>

<template>
  <header class="header">
    <BaseBreadcrumbs
      :breadcrumbs="[
        { title: 'Все вакансии', to: { name: RouteNames.VACANCIES } },
        { title: vacancyQuery.data.value?.title || '' },
      ]"
    />
    <h1>{{ vacancyQuery.data.value?.title }}</h1>
  </header>
  <BasePanel v-if="vacancyQuery.data.value">
    <GridLayout cols="2fr 1fr 1fr 1fr">
      <AppList
        :items="[
          {
            title: 'Оплата',
            content:
              vacancyQuery.data.value?.salary === 0
                ? 'Бесплатно'
                : `${vacancyQuery.data.value?.salary} ₽`,
          },
          {
            title: 'Период работы',
            content: `${vacancyQuery.data.value.period}`,
          },
          {
            title: 'Условия труда',
            content: `${vacancyQuery.data.value.conditions}`,
          },
          {
            title: 'Руководитель',
            content: `${vacancyQuery.data.value.project.supervisor.fio}`,
          },
          {
            title: 'Контакты руководителя',
            content: `${vacancyQuery.data.value.project.supervisor.email} ${vacancyQuery.data.value.project.supervisor.phone}`,
          },
        ]"
      />
      <div class="info">
        <h1>Требуемые навыки:</h1>
        <TagList isVisible :tag-list="vacancyQuery.data.value.skills" />
      </div>
      <div class="info">
        <h1>Обязанности:</h1>
        <p>{{ vacancyQuery.data.value.responsibilities }}</p>
      </div>
      <div class="info">
        <h1>Требования:</h1>
        <p>{{ vacancyQuery.data.value.requirements }}</p>
      </div>
    </GridLayout>
  </BasePanel>
  <footer class="footer">
    <ProjectListCard
      v-if="vacancyQuery.data.value"
      :project="vacancyQuery.data.value.project"
    />
    <BaseButton
      variant="text"
      @click="$router.push({ name: RouteNames.VACANCIES })"
    >
      Назад к списку
    </BaseButton>
  </footer>
</template>

<style lang="scss" scoped>
  .header {
    margin-top: 2rem;

    h1 {
      font-size: 2.25rem;
      font-weight: 700;
      margin-top: 1.6875rem;
      margin-bottom: 1.875rem;
    }
  }
  .info {
    h1 {
      font-weight: 400;
      font-size: 1.125rem;
      margin-bottom: 0.625rem;
    }
    p {
      font-size: 1.125rem;
      font-weight: 700;
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

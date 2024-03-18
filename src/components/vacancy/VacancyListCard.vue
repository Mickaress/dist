<script setup lang="ts">
  import { useCreateResponseMutation } from '@/api/CandidateApi/hooks/useCreateResponseMutation';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import TagList from '@/components/ui/TagList.vue';
  import type { VacancyType } from '@/models/Vacancy';
  import { vacancyRoute } from '@/router/utils/route';

  type Props = {
    vacancy: VacancyType;
  };
  const { mutate: createResponse } = useCreateResponseMutation();

  defineProps<Props>();
  // TODO: Можно заменить на BasePanel
</script>

<template>
  <article class="card">
    <header class="header">
      <RouterLink :to="vacancyRoute(vacancy.id)">
        <h1>
          {{ vacancy.title }}
        </h1>
      </RouterLink>
      <h2>
        {{ vacancy.project.title }}
      </h2>
      <p>
        {{ vacancy.project.supervisor.fio }}
      </p>
    </header>
    <div class="divider"></div>
    <main class="main">
      <p>
        Обязанности:
        <span>{{ vacancy.responsibilities }}</span>
      </p>
      <p>
        Требования:
        <span>{{ vacancy.requirements }}</span>
      </p>
      <p>
        Период работы:
        <span> {{ vacancy.period }} </span>
      </p>
      <p>
        Оплата:
        <span>{{
          vacancy.salary === 0 ? 'Бесплатно' : `${vacancy.salary} ₽`
        }}</span>
      </p>
    </main>
    <footer class="footer">
      <TagList :tag-list="vacancy.skills" />
      <BaseButton variant="outlined" @click="createResponse(vacancy.id)">
        Откликнуться
      </BaseButton>
      <BaseButton is="router-link" :to="vacancyRoute(vacancy.id)">
        Подробнее
      </BaseButton>
    </footer>
  </article>
</template>

<style lang="scss" scoped>
  .card {
    width: 100%;
    background-color: var(--light-color);
    border-radius: 0.625rem;
    padding: 1.375rem;
    box-shadow: 0 0 0.3125rem rgb(0 0 0 / 18%);
  }
  .header {
    h1 {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;

      &:hover {
        text-decoration: underline;
      }
    }
    h2 {
      font-size: 1.25rem;
      font-weight: normal;
      margin-bottom: 0.5rem;
    }
    p {
      font-weight: normal;
      margin-bottom: 0.75rem;
    }
  }
  .divider {
    width: 100%;
    height: 0.125rem;
    background-color: var(--medium-gray-color);
    margin-bottom: 0.875rem;
  }
  .main {
    p {
      font-weight: 700;
      margin-bottom: 1rem;
    }
  }
  .footer {
    display: flex;
    gap: 0.25rem;
  }
</style>

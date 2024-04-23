<script setup lang="ts">
  import { useGetProjectListQuery } from '@/api/ProjectApi/hooks/useGetProjectListQuery';
  import { useGetAllSkillsQuery } from '@/api/SkillApi/hooks/useGetAllSkillsQuery';
  import { useCloseProjectMutation } from '@/api/SupervisorApi/hooks/useCloseProjectMutation';
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import searchIconUrl from '@/assets/icons/search.svg?url';
  import BaseList from '@/components/BaseList.vue';
  import SidebarLayout from '@/components/layout/SidebarLayout.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseCard from '@/components/ui/BaseCard.vue';
  import BaseCheckbox from '@/components/ui/BaseCheckbox.vue';
  import BaseInput from '@/components/ui/BaseInput.vue';
  import SkillList from '@/components/ui/SkillList.vue';
  import ConfirmModal from '@/components/ui/modal/ConfirmModal.vue';
  import { useFilters } from '@/hooks/useFilters';
  import { createVacancyRoute, projectRoute } from '@/router/utils/route';
  import VMultiselect from '@vueform/multiselect';
  import { ref, watch } from 'vue';
  const projectListQuery = useGetProjectListQuery();

  const skillListQuery = useGetAllSkillsQuery();

  const { clearFilter, filter, filters, debouncedInput } = useFilters();

  watch(
    () => filters.value.title,
    () => {
      debouncedInput();
    },
  );

  const { data: userData } = useGetUserInfoQuery();
  const { mutate: closeProject } = useCloseProjectMutation();

  const deletableProjectId = ref<number>(0);
  const isShowDeleteModal = ref<boolean>(false);

  const onCloseProject = (projectId: number) => {
    deletableProjectId.value = projectId;
    isShowDeleteModal.value = true;
  };
  // TODO: Вынести фильтр в отдельный компонент
</script>

<template>
  <!-- Modals -->
  <ConfirmModal
    v-model:is-show="isShowDeleteModal"
    question="Вы уверены, что хотите закрыть этот НИОКР?"
    :agree-action="() => closeProject(deletableProjectId)"
    agree-answer="Закрыть"
    disagree-answer="Отмена"
  />
  <!-- Modals -->
  <SidebarLayout>
    <template #header>
      <h1>Все НИОКР</h1>
      <h2>На этой странице размещены все НИОКР</h2>
      <BaseInput
        v-model="filters.title"
        :icon="searchIconUrl"
        placeholder="Поиск по НИОКР..."
        type="text"
        inputmode="email"
        maxlength="100"
      />
    </template>
    <template #sidebar>
      <form class="filter" @submit.prevent="filter">
        <div>
          <h1 class="filter__title">Оплата проекта</h1>
          <BaseCheckbox value="true" v-model="filters.payment"> С оплатой </BaseCheckbox>
          <BaseCheckbox value="false" v-model="filters.payment"> Без оплаты </BaseCheckbox>
        </div>
        <div class="filter__divider"></div>
        <div>
          <h1 class="filter__title">Навыки</h1>
          <VMultiselect
            v-model="filters.skills"
            mode="tags"
            placeholder="Введите навык"
            no-results-text="Навык не найдена"
            no-options-text="Навыки не найдены"
            :close-on-select="false"
            :searchable="true"
            :options="skillListQuery.data.value"
            :disabled="skillListQuery.isFetching.value"
            :loading="skillListQuery.isFetching.value"
            label="name"
            track-by="name"
            value-prop="id"
          />
        </div>
        <div class="filter__divider"></div>
        <footer class="filter__footer">
          <BaseButton full-width type="submit"> Найти </BaseButton>
          <BaseButton variant="text" type="button" @click="clearFilter" full-width>
            Сбросить фильтры
          </BaseButton>
        </footer>
      </form>
    </template>
    <template #main>
      <BaseList
        :is-loading="projectListQuery.isLoading.value"
        :is-mini="false"
        :is-error="projectListQuery.isError.value"
        empty-title="НИОКР не найдены"
        empty-subtitle="Пока нет ни одного НИОКР с введённым названием и/или выбранными фильтрами"
        :total-items="projectListQuery.data.value?.quantity || 0"
      >
        <template #empty-button>
          <BaseButton @click="clearFilter"> Сбросить фильтры </BaseButton>
        </template>
        <template #list>
          <li v-for="project in projectListQuery.data.value?.projects" :key="project.id">
            <BaseCard
              :title="project.title"
              :link="projectRoute(project.id)"
              :state="project.state"
              is-divide
            >
              <template #header>
                <p>{{ project.supervisor.fio }}</p>
              </template>
              <template #main>
                <p>
                  Описание:
                  <span>{{ project.description }}</span>
                </p>
                <p>
                  Цель:
                  <span>{{ project.goal }}</span>
                </p>
                <p>
                  Период работы:
                  <span> {{ project.period }} </span>
                </p>
              </template>
              <template #footer>
                <SkillList :skillIds="project.skills" />
              </template>
              <template #buttons>
                <template v-if="project.supervisor.id === userData?.id">
                  <BaseButton color="red" variant="outlined" @click="onCloseProject(project.id)">
                    Закрыть НИОКР
                  </BaseButton>
                  <BaseButton
                    is="router-link"
                    variant="outlined"
                    :to="createVacancyRoute(project.id)"
                  >
                    Добавить вакансию
                  </BaseButton>
                </template>
                <BaseButton is="router-link" :to="projectRoute(project.id)"> Подробнее </BaseButton>
              </template>
            </BaseCard>
          </li>
        </template>
      </BaseList>
    </template>
  </SidebarLayout>
</template>

<style lang="scss" scoped>
  .filter {
    background-color: var(--light-color);
    padding: 1.25rem;
    border-radius: 0.625rem;
    border: 0.0625rem solid var(--medium-gray-color);

    &__title {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    &__divider {
      width: 100%;
      background: var(--medium-gray-color);
      height: 0.0625rem;
      margin: 1.25rem 0;
    }

    &__footer {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }
  }
</style>

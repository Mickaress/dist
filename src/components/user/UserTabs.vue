<template>
  <div class="wrapper">
    <ul class="list">
      <li class="item" v-for="link of routes" :key="link.name">
        <RouterLink
          class="action"
          :to="{ name: link.name }"
          v-if="!link.meta.links"
        >
          {{ link.meta.title }}
        </RouterLink>
        <template v-else>
          <SimpleAccordion
            v-if="link.meta.links.length === 0"
            class="accordion"
            default-opened
          >
            <template #title>
              <p class="action">
                {{ link.meta.title }}
              </p>
            </template>
            <template #content>
              <ul class="list">
                <li
                  v-for="childLink in projects"
                  :key="childLink.id"
                  class="item"
                >
                  <RouterLink
                    class="action"
                    :to="toProjectVacancies(childLink.id)"
                  >
                    {{ childLink.title }}
                  </RouterLink>
                </li>
              </ul>
            </template>
          </SimpleAccordion>
          <SimpleAccordion v-else class="accordion" default-opened>
            <template #title>
              <p class="action">
                {{ link.meta.title }}
              </p>
            </template>
            <template #content>
              <ul class="list">
                <li
                  v-for="childLink in link.meta.links"
                  :key="childLink.title"
                  class="item"
                >
                  <RouterLink class="action" :to="childLink.location">
                    {{ childLink.title }}
                  </RouterLink>
                </li>
              </ul>
            </template>
          </SimpleAccordion>
        </template>
      </li>
      <li>
        <button class="action" @click="isShowModal = true">
          Выйти из профиля
        </button>
      </li>
    </ul>
  </div>
  <ConfirmModal
    v-model:is-show="isShowModal"
    question="Вы уверены, что хотите выйти из аккаунта?"
    agreeAnswer="Выйти из аккаунта"
    disagree-answer="Остаться"
    :agreeAction="logout"
  />
</template>

<script setup lang="ts">
  import { useGetSupervisorActiveProjectsQuery } from '@/api/SupervisorApi/hooks/useGetSupervisorActiveProjectsQuery';
  import { useLogoutMutation } from '@/api/UserApi/hooks/useLogoutMutation';
  import { useRoleUserNavigationRoutes } from '@/hooks/useRoutes';
  import { toProjectVacancies } from '@/router/utils/route';
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import SimpleAccordion from '../ui/accordion/SimpleAccordion.vue';
  import ConfirmModal from '../ui/modal/ConfirmModal.vue';
  const routes = useRoleUserNavigationRoutes();

  const isShowModal = ref<boolean>(false);

  const { mutate: logout } = useLogoutMutation();

  const { data: projects } = useGetSupervisorActiveProjectsQuery();
</script>

<style lang="scss" scoped>
  .wrapper {
    border: 1px solid var(--medium-gray-color);
    background: var(--light-color);
    border-radius: 0.625rem;
  }

  .list {
    padding: 0 1.375rem;
  }

  .item:not(:last-child) {
    border-bottom: 1px solid var(--medium-gray-color);
  }

  .action {
    display: flex;
    width: 100%;
    padding: 1.25rem 0;
    font-size: 1.25rem;
    line-height: 1.625rem;
    color: var(--text-color);
    cursor: pointer;
  }

  .action:hover,
  .action.router-link-active {
    color: var(--accent-color);
  }

  .accordion {
    &:deep(.title) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>

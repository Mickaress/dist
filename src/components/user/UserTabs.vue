<template>
  <div class="tabs">
    <ul>
      <li v-for="route of routes" :key="route.name">
        <RouterLink :to="{ name: route.name }">
          {{ route.meta.title }}
        </RouterLink>
      </li>
      <li>
        <button @click="logout()">Выйти из профиля</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { useLogoutMutation } from '@/api/UserApi/hooks/useLogoutMutation';
  import { useRoleUserNavigationRoutes } from '@/hooks/useRoutes';
  import { RouterLink } from 'vue-router';

  const routes = useRoleUserNavigationRoutes();

  const { mutate: logout } = useLogoutMutation();
</script>

<style lang="scss" scoped>
  .tabs {
    background-color: var(--light-color);
    border-radius: 0.625rem;
    padding: 0.375rem 1.4375rem;
    box-shadow: 0 0 0.3125rem rgb(0 0 0 / 18%);
  }

  li {
    padding: 1.25rem 0;
    &:not(:last-child) {
      border-bottom: 1px solid var(--medium-gray-color);
    }
  }

  a,
  button {
    text-transform: uppercase;
    cursor: pointer;
    font-weight: 600;
    &.router-link-exact-active {
      color: var(--accent-color);
      font-weight: bold;
    }
    &:hover {
      color: var(--accent-color);
    }
  }
</style>

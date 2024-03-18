<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { useMainNavigationRoutes } from '@/hooks/useRoutes';

  const routes = useMainNavigationRoutes();
</script>

<template>
  <nav class="nav">
    <ul class="nav-list">
      <template v-for="link in routes" :key="link.name">
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: link.name }">
            {{ link.meta.title }}
          </RouterLink>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  .nav {
    height: 100%;
  }

  .nav-list {
    display: flex;
    height: 100%;
  }

  .nav-item {
    height: 100%;
  }

  .nav-link {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 2em;
    text-transform: uppercase;
    border-bottom: 0.25rem solid transparent;
    border-top: 0.25rem solid transparent;
  }

  .nav-link.router-link-exact-active:not(.contacts-link) {
    border-bottom-color: var(--orange-color);
  }

  .nav-link:hover {
    border-bottom-color: var(--orange-color);
  }
</style>

<template>
  <DropdownList
    :handle-node="props.handleNode"
    :is-open="props.isOpen"
    :item-list="items"
    @update:is-open="(value) => emit('update:isOpen', value)"
  />
</template>

<script setup lang="ts">
  import { useLogoutMutation } from '@/api/UserApi/hooks/useLogoutMutation';
  import DropdownList from '@/components/ui/DropdownList.vue';
  import { useRoleUserNavigationRoutes } from '@/hooks/useRoutes';
  import { DropdownItem } from '@/models/components/DropdownItem';
  import { watch } from 'vue';
  import { useRoute } from 'vue-router';

  type Props = {
    isOpen: boolean;
    handleNode?: HTMLElement;
  };
  type Emits = {
    (e: 'update:isOpen', isOpen: boolean): void;
  };

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const route = useRoute();
  const routes = useRoleUserNavigationRoutes();
  const { mutate: logout } = useLogoutMutation();

  watch(
    () => route.path,
    () => emit('update:isOpen', false),
  );

  const items = routes.map<DropdownItem>((route) => ({
    content: route.meta.title,
    location: { name: route.name },
    type: 'link',
  }));

  items.push({
    content: 'Выйти',
    type: 'button',
    action: logout,
  });
</script>

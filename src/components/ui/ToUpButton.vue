<template>
  <transition name="btn">
    <BaseButton v-if="props.visible" class="btn" @click="scroll" />
  </transition>
</template>

<script setup lang="ts">
  import { onBeforeMount, onBeforeUnmount } from 'vue';
  import BaseButton from './BaseButton.vue';

  type Props = {
    visible: boolean;
    topOffset?: number;
  };
  type Emits = {
    (event: 'update:visible', visible: boolean): void;
  };

  const props = withDefaults(defineProps<Props>(), { topOffset: 0 });
  const emit = defineEmits<Emits>();

  function scroll() {
    window.scrollTo({ behavior: 'smooth', left: 0, top: 0 });
  }

  function onScroll() {
    const fromTop = Math.floor(scrollY);
    emit('update:visible', fromTop !== undefined && fromTop > props.topOffset);
  }

  onBeforeMount(() => {
    window.addEventListener('scroll', onScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
  });
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .btn {
    position: fixed;
    right: 5rem;
    bottom: 4rem;
    z-index: 999;
    width: 4rem;
    height: 4rem;
    padding: 0;
    background-image: url('@/assets/icons/dropdown-arrow.svg');
    background-repeat: no-repeat;
    background-position: 50% 45%;
    background-size: 50%;
    border-radius: 50%;
    box-shadow: 0 0 0.3125rem rgb(0 0 0 / 18%);

    @media (width <= $tablet) {
      display: none;
    }
  }

  .btn-enter-active,
  .btn-leave-active {
    transition: opacity 0.3s ease;
  }

  .btn-enter-from,
  .btn-leave-to {
    opacity: 0;
  }
</style>

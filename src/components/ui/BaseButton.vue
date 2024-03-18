<template>
  <component
    :is="props.is"
    :disabled="props.disabled"
    :class="['button', props.variant]"
    :style="{
      width: props.fullWidth ? '100%' : undefined,
    }"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';

  export type Variant = 'primary' | 'outlined' | 'text' | 'tag';
  export type Is = 'button' | 'router-link' | 'a';

  type Props = {
    variant?: Variant;
    is?: Is;
    disabled?: boolean;
    fullWidth?: boolean;
  };

  const props = withDefaults(defineProps<Props>(), {
    is: 'button',
    variant: 'primary',
    disabled: false,
    fullWidth: false,
  });
</script>

<style scoped lang="scss">
  .button {
    text-transform: uppercase;
    display: inline-flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: center;
    border: 0;
    cursor: pointer;
    border-radius: 0.3125rem;
    transition: 20ms ease;
  }

  %primary {
    color: var(--light-color);
    background-color: var(--accent-color);
    padding: 1rem 2rem;
    border: 0.125rem solid var(--accent-color);

    &:hover {
      background-color: var(--dark-accent-color);
      border-color: var(--dark-accent-color);
    }

    &:active {
      background-color: var(--light-accent-color);
      border-color: var(--light-accent-color);
    }

    &:disabled {
      background-color: var(--dark-gray-color);
      border-color: var(--dark-gray-color);
    }
  }

  %outlined {
    color: var(--accent-color);
    background-color: transparent;
    border: 0.125rem solid var(--accent-color);
    padding: 1rem 2rem;

    &:hover {
      color: #fff;
      background-color: var(--dark-accent-color);
      border-color: var(--dark-accent-color);
    }

    &:active {
      color: #fff;
      background-color: var(--light-accent-color);
      border-color: var(--light-accent-color);
    }

    &:disabled {
      color: var(--dark-gray-color);
      border-color: var(--dark-gray-color);
    }
  }

  %tag {
    @extend %primary;

    padding: 0.4375rem 1.25rem;
    font-size: 0.875rem;
    border-radius: 6.25rem;
  }

  %text {
    color: var(--accent-color);
    background-color: transparent;

    &:hover {
      text-decoration: underline;
    }

    &:active {
      color: var(--light-accent-color);
    }

    &:disabled {
      color: var(--dark-gray-color);
    }
  }
  .primary {
    @extend %primary;
  }
  .outlined {
    @extend %outlined;
  }
  .text {
    @extend %text;
  }
  .tag {
    @extend %tag;
  }
</style>

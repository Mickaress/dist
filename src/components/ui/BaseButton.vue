<template>
  <component
    :is="props.is"
    :disabled="props.disabled"
    :class="['button', props.variant, props.color]"
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
  export type Color = 'red';

  type Props = {
    variant?: Variant;
    is?: Is;
    disabled?: boolean;
    fullWidth?: boolean;
    color?: Color;
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
    --main-color: var(--accent-color);
    --dark-main-color: var(--dark-accent-color);
    --light-main-color: var(--light-accent-color);

    text-transform: uppercase;
    display: inline-flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: center;
    border: 0;
    cursor: pointer;
    border-radius: 0.3125rem;
    transition: 20ms ease;
    white-space: nowrap;
    &.red {
      --main-color: var(--red-color);
      --dark-main-color: var(--dark-red-color);
      --light-main-color: var(--light-red-color);
    }
  }

  .primary {
    color: var(--light-color);
    background-color: var(--main-color);
    padding: 1rem 2rem;
    border: 0.125rem solid var(--main-color);

    &:hover {
      background-color: var(--dark-main-color);
      border-color: var(--dark-main-color);
    }

    &:active {
      background-color: var(--light-main-color);
      border-color: var(--light-main-color);
    }

    &:disabled {
      background-color: var(--dark-gray-color);
      border-color: var(--dark-gray-color);
    }
  }

  .outlined {
    color: var(--main-color);
    background-color: transparent;
    border: 0.125rem solid var(--main-color);
    padding: 1rem 2rem;

    &:hover {
      color: #fff;
      background-color: var(--dark-main-color);
      border-color: var(--dark-main-color);
    }

    &:active {
      color: #fff;
      background-color: var(--light-main-color);
      border-color: var(--light-main-color);
    }

    &:disabled {
      color: var(--dark-gray-color);
      border-color: var(--dark-gray-color);
    }
  }

  .text {
    color: var(--main-color);
    background-color: transparent;

    &:hover {
      color: var(--dark-main-color);
      text-decoration: underline;
    }

    &:active {
      color: var(--light-main-color);
    }

    &:disabled {
      color: var(--dark-gray-color);
    }
  }
  .tag {
    color: var(--light-color);
    background-color: var(--main-color);
    padding: 0.4375rem 1.25rem;
    border-radius: 1.875rem;
    text-transform: none;

    &:hover {
      background-color: var(--dark-main-color);
    }

    &:active {
      background-color: var(--light-main-color);
    }

    &:disabled {
      background-color: var(--dark-gray-color);
    }
  }
</style>

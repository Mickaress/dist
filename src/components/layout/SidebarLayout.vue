<template>
  <div class="container">
    <aside class="aside">
      <slot name="sidebar"></slot>
    </aside>
    <div>
      <slot name="main"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    display: grid;
    grid-template-columns: 23.75rem auto;
    gap: 2.125rem;
  }

  .aside {
    align-self: flex-start;
  }
</style>

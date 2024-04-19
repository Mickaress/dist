<template>
  <nav class="pagination">
    <ul class="pagination-list">
      <li :class="['pagination-item', { 'disabled-item': currentPage === 1 }]">
        <button :class="['pagination-btn', 'pagination-arrow']" @click="setPage(currentPage - 1)">
          &lt;
        </button>
      </li>
      <li
        v-for="pageLink in pages"
        :key="pageLink"
        :class="[
          'pagination-item',
          { active: pageLink === currentPage },
          { 'disabled-item': currentPage === pageLink },
        ]"
      >
        <button class="pagination-btn" @click="setPage(pageLink)">
          {{ pageLink }}
        </button>
      </li>
      <li :class="['pagination-item', { 'disabled-item': currentPage === totalPages }]">
        <button
          :disabled="currentPage === totalPages"
          :class="['pagination-btn', 'pagination-arrow']"
          @click="setPage(currentPage + 1)"
        >
          &gt;
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import { PAGES_VISIBLE, PER_PAGE } from '@/constants';
  import { computed, ref, watch } from 'vue';

  type Props = {
    totalItems: number;
    currentPage: number;
    setPage: (page: number) => void;
    pageSize?: number;
  };

  const props = withDefaults(defineProps<Props>(), {
    pageSize: PER_PAGE,
  });

  const pagesVisible = PAGES_VISIBLE;

  const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize));
  const startPage = ref(1);
  const endPage = ref(1);

  // генерирует видимые ссылки пагинации
  const pages = computed(() => {
    const pages = [1];
    if (totalPages.value <= 1) return pages;

    for (let i = startPage.value + 1; i <= endPage.value - 1; i++) {
      pages.push(i);
    }

    if (totalPages.value !== 1) {
      pages.push(totalPages.value);
    }

    return pages;
  });

  watch(
    () => [props.currentPage],
    ([page]) => {
      updatePages(page);
    },
    { immediate: true },
  );

  function updatePages(page: number) {
    startPage.value = page - Math.ceil(pagesVisible / 2);
    endPage.value = page + Math.floor(pagesVisible / 2) - 1;

    if (startPage.value <= 0) {
      endPage.value -= startPage.value - 1;
      startPage.value = 1;
    }

    if (endPage.value > totalPages.value) {
      endPage.value = totalPages.value;
      if (endPage.value > props.pageSize) {
        startPage.value = endPage.value - pagesVisible + 1;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pagination {
    margin-top: 0.9375rem;
    margin-bottom: 0.9375rem;
    background: var(--light-color);
    border-radius: 0.625rem;
    box-shadow: 0 0 0.3125rem rgb(0 0 0 / 18%);
  }
  .pagination-list {
    display: flex;
    gap: 2.25rem;
    justify-content: center;
  }
  .pagination-item {
    width: 2.5625rem;
    height: 3.3125rem;
  }
  .disabled-item {
    pointer-events: none;
    button {
      color: var(--medium-gray-color);
    }
  }
  .pagination-btn {
    width: 100%;
    height: 100%;
    font-size: 1.25rem;
    color: var(--dark-gray-color);
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-bottom: 0.25rem solid transparent;
  }
  .pagination-btn:hover,
  .pagination-item.active .pagination-btn {
    border-bottom-color: var(--orange-color);
  }
  .pagination-arrow:hover {
    color: var(--orange-color);
    border-bottom-color: transparent;
  }
</style>

import { mobile, tablet } from '@/constants/breakpoints';
import { useMediaQuery } from '@vueuse/core';
import { Ref, computed } from 'vue';

export const useDesktop = (): Ref<boolean> => useMediaQuery(`(min-width: ${tablet})`);

export const useTablet = (): Ref<boolean> =>
  useMediaQuery(`(min-width: ${mobile}) and (max-width: ${tablet})`);

export const useMobile = (): Ref<boolean> => useMediaQuery(`(max-width: ${mobile})`);

export const useSmallDevice = (): Ref<boolean> => {
  const isTablet = useTablet();
  const isMobile = useMobile();
  return computed(() => isTablet.value || isMobile.value);
};

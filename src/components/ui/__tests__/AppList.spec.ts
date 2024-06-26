import { AppListItemType } from '@/models/components/AppList';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppList from '../AppList.vue';

describe('AppList.vue', () => {
  describe(':props', () => {
    it('отображаются все элементы списка', async () => {
      const items: AppListItemType[] = [
        { title: '1', content: '1' },
        { title: '2', content: '2' },
        { title: '3', content: '3' },
      ];
      const wrapper = mount(AppList, { props: { items } });
      const passedItems = wrapper.findAll('ul > li');
      expect(passedItems).toHaveLength(items.length);
    });
  });
});

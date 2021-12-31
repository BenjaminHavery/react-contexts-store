
import { makeStore } from 'react-contexts-store';

import _pages from 'Pages';


const store = makeStore({
  initialState: {
    pageSlug: false,
    sectionSlug: false,
  },
  actions: {
    setPage: (state, action) => ({ ...state, pageSlug: action.page?.slug || action.pageSlug || false }),
  },
  selectors: {
  },
  computed: {
    route: [['pageSlug', 'sectionSlug'], (p,s) => {
      const r = [''];
      if (p) r.push(p);
      if (p && s) r.push(s);
      return r.join('/') || '/';
    }],
    pages: [['pageSlug'], (s) => _pages.map(p => ({ ...p, active: p.slug === s }))],
    page: [['pages'], (p) => p.find(pp => pp.active) || p[0]],
  },
});

const {
  StoreProvider,
  useDispatch,
  useStore,
  useRoute,
  usePages,
  usePage,
} = store;

export {
  StoreProvider,
  useDispatch,
  useStore,
  useRoute,
  usePages,
  usePage,
};

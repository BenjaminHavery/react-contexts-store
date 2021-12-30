
import { makeStore } from 'react-contexts-store';

import _pages from 'Pages';


const store = makeStore({
  initialState: {
    slug: false,
  },
  actions: {
    setPage: (state, action) => ({ ...state, slug: action.slug || action.page?.slug || false }),
  },
  selectors: {
  },
  computed: {
    pages: [['slug'], (s) => _pages.map(p => ({ ...p, active: p.slug === s }))],
    page: [['pages'], (ps) => ps.find(p => p.active) || ps[0]],
  },
});

const {
  StoreProvider,
  useDispatch,
  useStore,
  usePages,
  usePage,
} = store;

export {
  StoreProvider,
  useDispatch,
  useStore,
  usePages,
  usePage,
};

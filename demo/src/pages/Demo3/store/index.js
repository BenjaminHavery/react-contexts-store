
import { makeStore } from 'react-contexts-store';

import exampleSlice from './slices/exampleSlice';


const store = makeStore({
  initialState: {
    int: 0,
  },
  actions: {
    increment: (state) => ({ ...state, int: state.int + 1 }),
  },
  slices: [
    exampleSlice,
  ],
});

const {
  StoreProvider,
  useDispatch,
  useStore,
  useInt,
} = store;

export {
  StoreProvider,
  useDispatch,
  useStore,
  useInt,
};

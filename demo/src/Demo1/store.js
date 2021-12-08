
import { makeStore } from '../../../src/index';


const store = makeStore({
  initialState: {
    int: 0,
  },
  actions: {
    increment: (state) => ({ ...state, int: state.int + 1 }),
    multiply: (state, action) => ({ ...state, int: state.int * action.by }),
    reset: (state) => ({ ...state, int: 0 }),
  },
});

const {
  StoreProvider,
  useDispatch,
  useInt,
} = store;

export {
  StoreProvider,
  useDispatch,
  useInt,
};

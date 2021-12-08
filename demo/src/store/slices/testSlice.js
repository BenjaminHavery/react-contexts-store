
import { makeSlice, makeSelector, makeComputedSelector } from '../../../../src/index';


// const [selectorInt3, useInt3] = makeSelector((state) => state.int2 * 2);
// const [selectorInt4, useInt4] = makeComputedSelector([useInt3], (int) => int * 2);

// Reducer
const testSlice = makeSlice({
  initialState: {
    int2: 99,
  },
  selectors: {
    int3: (state) => state.int2 * 2,
  },
  computed: {
    int4: [['int2', 'int3'], (i2,i3) => i2+i3],
  },
});

const {
  useInt2,
  useInt3,
  useInt4,
} = testSlice;

export {
  testSlice,
  useInt2,
  useInt3,
  useInt4,
};


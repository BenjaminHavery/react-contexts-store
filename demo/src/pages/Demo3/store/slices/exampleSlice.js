
import { makeSlice } from 'react-contexts-store';


const exampleSlice = makeSlice({ // All config keys optional, returns symetrical with makeStore but without useStore, useDispatch and StoreProvider
  initialState: {
    sliceInt: 0,
    text: 'Namespacing of state and action keys is user defined.',
  },
  actions: {
    incrementIntThatIsInSlice: (state) => ({ ...state, sliceInt: state.sliceInt + 1 }),
  },
  // computed: {}, // Works with makeSlice identically to makeStore, documented later
  // methods: {},  // Works with makeSlice identically to makeStore, documented later
});

export default exampleSlice; // For passing to makeStore slices config key, doesn't have to be a default export but I thought it looked neat


const { // Slice state access hooks unpacked in the same way as ones from makeStore
  useSliceInt,
  useText,
} = exampleSlice;

export { // Slice state access exported in the same way as ones from makeStore
  useSliceInt,
  useText,
};

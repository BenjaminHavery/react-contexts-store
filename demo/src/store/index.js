
import { makeStore } from '../../../src/index';

// import { testSlice } from './slices/testSlice';

const store = makeStore({
  initialState: {
    intTest: 0,
    stringTest: 'test',
    objectTest: {
      string: 'object test value',
      string2: 'object test value 2',
      deepObject: {
        string: 'deep object test value',
      },
    },
    arrayTest: ['one', 'two', 'three'],
    objectArrayTest: [],
  },
  selectors: {
    arrayTestFirst: (state) => state.arrayTest[0],
  },
  computed: {
    arrayTestBackwards: [['arrayTest'], (array) => [...array].reverse() ],
    // testComputedSelector: [['personName', 'testSelector'], (name, test1) => name + ' wrote ' + test1],
    // testComputedSelector2: [['testComputedSelector'], (testC) => testC],
  },
  actions: {
    incrementInt: (state, action) => console.log('increment int', action) || ({ ...state, intTest: state.intTest + 1 }),
    doubleInt: (state, action) => console.log('double int', action) || ({ ...state, intTest: state.intTest * 2 }),
  },
  methods: {
    both: (dispatch) => {
      dispatch('incrementInt');
      dispatch('doubleInt');
    },
    logRef: (_,__, ref) => console.log(ref.current),
    logComputed: (_,__, ref) => console.log(ref.current.computed),
  },
  slices: [
    // testSlice,
  ],
});



const {
  StoreProvider,
  useStore,
  useDispatch,
  // useMethod,
  useIntTest,
  useStringTest,
  useObjectTest,
  useObjectTestString,
  useObjectTestString2,
  useObjectTestDeepObject,
  useObjectTestDeepObjectString,
  useArrayTest,
  useArrayTestBackwards,
} = store;

export {
  StoreProvider,
  useStore,
  useDispatch,
  // useMethod,
  useIntTest,
  useStringTest,
  useObjectTest,
  useObjectTestString,
  useObjectTestString2,
  useObjectTestDeepObject,
  useObjectTestDeepObjectString,
  useArrayTest,
  useArrayTestBackwards,
};













// // Imported shelves
// const { initialState, actions, methods, selectors } = combineShelves([
//   auth,
//   modals,
// ]);


// // Core contexts
// const [useStoreState, ProviderStoreState] = makeContext(); // Potentially inefficient to sub to this directly, but handy for prototyping new components
// const [useDispatch, ProviderDispatch] = makeContext();
// const [useMethod, ProviderMethod] = makeContext();
// export { useStoreState, useDispatch, useMethod };


// // Provider
// export const StoreProvider = ({ children }) => {

//   const [state, dispatch] = useActionsReducer(actions, initialState),
//         method = useMethodsDispatcher(methods, dispatch, state);

//   const providers = [
//     [ProviderStoreState, () => state],
//     [ProviderDispatch, () => dispatch],
//     [ProviderMethod, () => method],
//     ...selectors.map((s) => [s.Provider, s.useValue]),
//   ];

//   return <Providers {...{ providers, state }}>{ children }</Providers>;
// };

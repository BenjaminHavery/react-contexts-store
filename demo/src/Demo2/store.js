
import { makeStore } from '../../../src/index';


const store = makeStore({
  initialState: {
    int: 0,
    string: 'String one',
    objectExample: {
      int: 0,
      string: 'String two',
      deepObject: {
        int: 0,
        string: 'String three',
      },
    },
    arrayExample: ['one', 'two', 'three'],
  },
  selectors: {
    arrayExampleFirst: (state) => state.arrayExample[0],
    arrayExampleMiddle: (state) => state.arrayExample[1],
  },
  actions: {
    incrementInt1: (state) => ({ ...state, int: state.int + 1 }),
    incrementInt2: (state) => ({ ...state, objectExample: { ...state.objectExample, int: state.objectExample.int + 1 }}),
    incrementInt3: (state) => ({ ...state, objectExample: { ...state.objectExample, deepObject: { ...state.objectExample.deepObject, int: state.objectExample.deepObject.int + 1 }}}),
    reverseArray: (state) => ({ ...state, arrayExample: [...state.arrayExample].reverse()}),
  },
});

const {
  StoreProvider,
  useDispatch,
  useStore,
  useInt,
  useString,
  useObjectExample,
  useObjectExampleInt,
  useObjectExampleString: useString2, // Renaming long hooks here can be handy
  useObjectExampleDeepObject,
  useObjectExampleDeepObjectInt,
  useObjectExampleDeepObjectString, // Renamed below
  useArrayExample,
  useArrayExampleFirst,
  useArrayExampleMiddle,
} = store;

export {
  StoreProvider,
  useDispatch,
  useStore,
  useInt,
  useString,
  useObjectExample,
  useObjectExampleInt,
  useString2, // Renamed above
  useObjectExampleDeepObject,
  useObjectExampleDeepObjectInt,
  useObjectExampleDeepObjectString as useString3, // Renaming here also is fine
  useArrayExample,
  useArrayExampleFirst,
  useArrayExampleMiddle,
};


import { makeStore } from '../../../src/index';


const store = makeStore({
  initialState: {
    int: 0,
    string: '',
    array: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  },
  actions: {
    incrementInt: (state) => ({ ...state, int: state.int + 1 }),
    reverseArray: (state) => ({ ...state, array: [...state.array].reverse()}),
  },
  selectors: {
    arrayEvenDumbSelector: (state) => state.array.filter(n => n % 2 === 0),
  },
  computed: {
    arrayEven: [['array'], (array) => array.filter(n => n % 2 === 0)],
    arrayOdd: [['array', 'arrayEven'], (a,e) => a.filter(n => !e.includes(n))], // Can depend on other computed values
    arrayLessThanInt: [['array', 'int'], (a,i) => a.filter(n => n < i)],
    arrayGreaterThanInt: [['array', 'int'], (a,i) => a.filter(n => n > i)],
  },
});

const {
  StoreProvider,
  useDispatch,
  useStore,
  useInt,
  useString,
  useArray,
  useArrayEvenDumbSelector,
  useArrayEven,
  useArrayOdd,
  useArrayLessThanInt,
  useArrayGreaterThanInt,
} = store;

export {
  StoreProvider,
  useDispatch,
  useStore,
  useInt,
  useString,
  useArray,
  useArrayEvenDumbSelector,
  useArrayEven,
  useArrayOdd,
  useArrayLessThanInt,
  useArrayGreaterThanInt,
};


import React from 'react'

import ValueTrackerTable from 'Components/ValueTrackerTable';
import Code from 'Components/Code';

import {
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
} from './store'


// Wrap store
export default {
  title: 'Computed selectors',
  Component: () => (
    <StoreProvider>
      <Demo/>
    </StoreProvider>
  )
}


// Demo page
const Demo = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Code1/>

      <p>Click some buttons below and check out the result:</p>

      <p>
        <button onClick={() => dispatch('incrementInt')}>Increment int</button>
        <button onClick={() => dispatch('reverseArray')}>Reverse array</button>
      </p>

      <ValueTrackerTable rows={[
        ['state', useStore],
        ['state.int', useInt],
        ['state.string', useString],
        ['state.array', useArray],
        ['Selector (inefficient): arrayEvenDumbSelector', useArrayEvenDumbSelector],
        ['Computed: arrayEven', useArrayEven],
        ['Computed: arrayOdd', useArrayOdd],
        ['Computed: arrayLessThanInt', useArrayLessThanInt],
        ['Computed: arrayGreaterThanInt', useArrayGreaterThanInt],
      ]}/>
    </div>
  )
}


// Example code
const Code1 = () => <Code>{`
import { makeStore } from 'react-contexts-store';

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
`}</Code>

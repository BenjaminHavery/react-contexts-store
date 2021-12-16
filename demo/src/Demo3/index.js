
import React, { useRef } from 'react';

import {
  StoreProvider,
  useDispatch,
  useStore,
  useInt,
} from './store/index';

import {
  useSliceInt,
  useText,
} from './store/slices/exampleSlice'


const ValueTest = ({ name, useValue }) => {
  const val = useValue();
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <tr>
      <td>{name}</td>
      <td>{JSON.stringify(val)}</td>
      <td>{renderCount.current}</td>
    </tr>
  )
}

const Demo3 = () => {
  const dispatch = useDispatch();
  const testValues = [
    ['state', useStore],
    ['state.int', useInt],
    ['state.sliceInt (from slice)', useSliceInt],
    ['state.text (from slice)', useText],
  ];

  return (
    <div>
      <h2>Code splitting with slices</h2>
      <p>For medium to large stores putting every part of your store definition in a single file is likely impractical an ilegible. In this instance it can be useful to split your store definition into "slices" by whatever grouping criteria makes sense for your project.</p>
      <p>Slices are created using the makeSlice function, which works mostly symetrically with the makeStore function we already looked at. For example:</p>
      <Code1/>
      <p>You can define your slices in whichever file or folder is your preference, my own usually being to have a /store directory containing an index.js file for the root store definition (makeStore) and a /store/slices directory containing a seperate sliceName.js file for each slice.</p>
      
      <p>After having defined your slice you'll need to add it to your store by:</p>
      <ol>
        <li>Importing the slice object returned by makeSlice into the file in which you're calling makeStore.</li>
        <li>Passing that slice to makeStore as part of the slices array.</li>
      </ol>
      <p>For example:</p>
      <Code2/>

      <p>Now we can use the state and actions defined in our slice as if they had been defined in our main store.</p>
      <p>Let's recycle our render behavour example to examine the store we just created:</p>

      <p>
        <button onClick={() => dispatch('increment')}>Increment int</button>
        <button onClick={() => dispatch('incrementIntThatIsInSlice')}>Increment sliceInt</button>
      </p>

      <table>
        <tbody>
          <tr>
            <th>Store location</th>
            <th>Value</th>
            <th>Render count</th>
          </tr>
          { testValues.map(([name, useValue], key) => <ValueTest {...{ name, useValue, key }}/> )}
        </tbody>
      </table>

      <Code3/>
    </div>
  )
}


// Wrap store and export
export default () => (
  <StoreProvider>
    <Demo3/>
  </StoreProvider>
)

const Code = ({ children }) => <pre>{ children.trim() }</pre>

// Example code blocks
const Code1 = () => <Code>{`
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

export default exampleSlice; // For passing to makeStore, doesn't have to be a default export but I thought it looked neat

const { // Slice state access hooks unpacked in the same way as ones from makeStore
  useSliceInt,
  useText,
} = exampleSlice;

export { // Slice state access exported in the same way as ones from makeStore
  useSliceInt,
  useText,
};
`}</Code>

const Code2 = () => <Code>{`
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
`}</Code>

const Code3 = () => <Code>{`
import {
  StoreProvider,
  useDispatch,
  useStore,
  useInt,
} from './store/index';

import {
  useSliceInt,
  useText,
} from './store/slices/exampleSlice'

export default () => {
  const dispatch = useDispatch();
  const testValues = [
    ['state', useStore],
    ['state.int', useInt],
    ['state.sliceInt (from slice)', useSliceInt],
    ['state.text (from slice)', useText],
  ];

  return (
    <div>
      <p>
        <button onClick={() => dispatch('increment')}>Increment int</button>
        <button onClick={() => dispatch('incrementIntThatIsInSlice')}>Increment sliceInt</button>
      </p>
      <table>
        <tbody>
          <tr>
            <th>Store location</th>
            <th>Value</th>
            <th>Render count</th>
          </tr>
          { testValues.map(([name, useValue], key) => <ValueTest {...{ name, useValue, key }}/> )}
        </tbody>
      </table>
    </div>
  );
};
`}</Code>

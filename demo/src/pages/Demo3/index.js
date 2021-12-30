
import React from 'react';

import ValueTrackerTable from 'Components/ValueTrackerTable';
import Code from 'Components/Code';

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


// Wrap store
export default () => (
  <StoreProvider>
    <Demo/>
  </StoreProvider>
)


// Demo page
const Demo = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Code splitting with slices</h2>
      <p>For medium to large stores putting every part of your store definition in a single file is likely impractical and illegible. In this instance it can be useful to split your store definition into "slices" by whatever grouping criteria makes sense for your project.</p>
      
      <h3>Defining a slice</h3>
      <p>Slices are created using the makeSlice function, which works (mostly) symmetrically with the makeStore function we already looked at. For example:</p>
      <Code1/>
      <p>You can locate your slices in whichever file or folder is your preference, my own usually being to have a <b>/store</b> directory containing an <b>index.js</b> file for the root store definition (makeStore) and a <b>/store/slices</b> directory containing a separate <b>sliceName.js</b> file for each slice.</p>
      
      <h3>Registering a slice</h3>
      <p>After defining your slice you'll need to add it to a store, you can do this by:</p>
      <ol>
        <li>Importing your slice into the file in which you're calling makeStore.</li>
        <li>Passing your slice to makeStore as part of the slices array.</li>
      </ol>
      <p>For example:</p>
      <Code2/>

      <h3>Using the store</h3>
      <p>Store use in components is identical to if your store had been defined without slices, save for that slice access hooks are imported from the sliceName.js file we defined them in.</p>
      <p>Let's recycle our ValueTrackerTable component to examine the store we just created:</p>
      <Code3/>

      <p>
        <button onClick={() => dispatch('increment')}>Increment int</button>
        <button onClick={() => dispatch('incrementIntThatIsInSlice')}>Increment sliceInt</button>
      </p>

      <ValueTrackerTable rows={[
        ['state', useStore],
        ['state.int', useInt],
        ['state.sliceInt (from slice)', useSliceInt],
        ['state.text (from slice)', useText],
      ]}/>

    </div>
  )
}


// Example code
const Code1 = () => <Code>{`
import { makeSlice } from 'react-contexts-store';

const exampleSlice = makeSlice({ // All config keys optional, returns symmetrical with makeStore but without useStore, useDispatch and StoreProvider
  initialState: {
    sliceInt: 0,
    text: 'Namespacing of state and action keys is user defined.',
  },
  actions: {
    incrementIntThatIsInSlice: (state) => ({ ...state, sliceInt: state.sliceInt + 1 }),
  },
  // selectors: {}, // Works with makeSlice identically to makeStore
  // computed: {}, // Works with makeSlice identically to makeStore, documented later
  // methods: {},  // Works with makeSlice identically to makeStore, documented later
});

export default exampleSlice; // For passing to makeStore, doesn't have to be a default export but I thought it looked neat

const { // Slice state access hooks unpacked in the same way as ones from makeStore
  useSliceInt,
  useText,
} = exampleSlice;

export { // Slice state access hooks exported in the same way as ones from makeStore
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

  return (
    <div>
      <p>
        <button onClick={() => dispatch('increment')}>Increment int</button>
        <button onClick={() => dispatch('incrementIntThatIsInSlice')}>Increment sliceInt</button>
      </p>
      <ValueTrackerTable rows={[
        ['state', useStore],
        ['state.int', useInt],
        ['state.sliceInt (from slice)', useSliceInt],
        ['state.text (from slice)', useText],
      ]}/>
    </div>
  );
};
`}</Code>

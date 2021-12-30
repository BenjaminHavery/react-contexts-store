
import React from 'react'

import ValueTrackerTable from 'Components/ValueTrackerTable';
import Code from 'Components/Code';

import {
  StoreProvider,
  useDispatch,
  useStore,
  useInt,
  useString,
  useObjectExample,
  useObjectExampleInt,
  useString2,
  useObjectExampleDeepObject,
  useObjectExampleDeepObjectInt,
  useString3,
  useArrayExample,
  useArrayExampleFirst,
  useArrayExampleMiddle,
} from './store'


export default {
  title: 'Selectors and keys',
  Component: () => (
    <StoreProvider>
      <Demo/>
    </StoreProvider>
  )
}


const Demo = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <p>A more complex store will usually include objects, nested objects and/or arrays in its state.</p>
      <ul>
        <li>You can include these in your <b>initialState</b> object to automatically produce a useValue hook for every addressable object key, named "<b>use<em>CamelCaseCombinedKeys</em></b>" by default for exporting.</li>
        <li>You can also define additional custom selectors by including a selectors object in makeStore(), which will produce additional useValue hooks named "<b>use<em>SelectorKey</em></b>" by default for exporting. All selectors share a namespace, so you should avoid reusing keys in your custom selectors that were already inferred from initial state.</li>
      </ul>
      <p>Lets create a somewhat convoluted store to see what that looks like and explore render behaviour:</p>
      <Code1/>

      <p>Let's also create a generic ValueTest component, to render a value from our store via a subscription to its useValue hook and count the number of times it has rendered. This information will be tabulated so our component should return a table row:</p>
      <Code2/>

      <p>Finally lets use ValueTest in a component to render every one of our state values (including the root state) into a table, along with some buttons for dispatching test actions:</p>
      <Code3/>

      <p>Click some buttons below and check out the result:</p>

      <p>
        <button onClick={() => dispatch('incrementInt1')}>Increment int 1</button>
        <button onClick={() => dispatch('incrementInt2')}>Increment int 2</button>
        <button onClick={() => dispatch('incrementInt3')}>Increment int 3</button>
        <button onClick={() => dispatch('reverseArray')}>Reverse array</button>
      </p>

      <ValueTrackerTable rows={[
        ['state', useStore],
        ['state.int', useInt],
        ['state.string', useString],
        ['state.objectExample', useObjectExample],
        ['state.objectExample.int', useObjectExampleInt],
        ['state.objectExample.string', useString2],
        ['state.objectExample.deepObject', useObjectExampleDeepObject],
        ['state.objectExample.deepObject.int', useObjectExampleDeepObjectInt],
        ['state.objectExample.deepObject.string', useString3],
        ['state.arrayExample', useArrayExample],
        ['state.arrayExample[0]', useArrayExampleFirst],
        ['state.arrayExample[1]', useArrayExampleMiddle],
      ]}/>

      <h3>The result... Efficient rendering!</h3>
      <p>You may have noticed:</p>
      <ul>
        <li>The row subscribed directly to state via useStore gets rerendered with every update, because the old state object got spread into a new one. This is why we don't want to subscribe to the root state object, and why context-store implementations (which do this) are unperformant.</li>
        <li>Conversely, each row subscribed to one of the 3 strings only renders once, no matter what you update, because none of our actions target them.</li>
        <li>Rows subscribed to the 2 nested objects update when their children do, ie. when an action spreads them.</li>
        <li>The rows subscribed to arrayExample and arrayExample[0] rerender when you reverse the array, but arrayExample[1] doesn't because the middle value of the 3 element array hasn't changed.</li>
      </ul>
      <p>So, components subscribed to a value rerender only when that specific value changes in terms of strict equality. Neat!</p>
    </div>
  )
}


// Example code blocks
const Code1 = () => <Code>{`
import { makeStore } from 'react-contexts-store';

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
`}</Code>

const Code2 = () => <Code>{`
import { useRef } from 'react';

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
`}</Code>

const Code3 = () => <Code>{`
import {
  useDispatch,
  useStore,
  useInt,
  useString,
  useObjectExample,
  useObjectExampleInt,
  useString2,
  useObjectExampleDeepObject,
  useObjectExampleDeepObjectInt,
  useString3,
  useArrayExample,
  useArrayExampleFirst,
  useArrayExampleMiddle,
} from './store'

export default () => {
  const dispatch = useDispatch();
  const testValues = [
    ['state', useStore],
    ['state.int', useInt],
    ['state.string', useString],
    ['state.objectExample', useObjectExample],
    ['state.objectExample.int', useObjectExampleInt],
    ['state.objectExample.string', useString2],
    ['state.objectExample.deepObject', useObjectExampleDeepObject],
    ['state.objectExample.deepObject.int', useObjectExampleDeepObjectInt],
    ['state.objectExample.deepObject.string', useString3],
    ['state.arrayExample', useArrayExample],
    ['state.arrayExample[0]', useArrayExampleFirst],
    ['state.arrayExample[1]', useArrayExampleMiddle],
  ];

  return (
    <div>
      <p>
        <button onClick={() => dispatch('incrementInt1')}>Increment int 1</button>
        <button onClick={() => dispatch('incrementInt2')}>Increment int 2</button>
        <button onClick={() => dispatch('incrementInt3')}>Increment int 3</button>
        <button onClick={() => dispatch('reverseArray')}>Reverse array</button>
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

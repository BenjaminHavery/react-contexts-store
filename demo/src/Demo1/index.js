
import React from 'react'

import {
  StoreProvider,
  useDispatch,
  useInt,
} from './store'


const Demo1 = () => {
  const dispatch = useDispatch();
  const int = useInt();

  return (
    <div>
      <h2>Basic Usage</h2>
      <p>Let's make a store with a single state key, "int", and some actions for manupulating it. We'll then access int in a component and update it via some buttons, producing the following:</p>
      <p><b>Int:</b> { int }</p>
      <button onClick={() => dispatch('increment')}>Increment</button>
      <button onClick={() => dispatch({ type: 'multiply', by: 2 })}>Double</button>
      <button onClick={() => dispatch({ type: 'multiply', by: int })}>Square</button>
      <button onClick={() => dispatch('reset')}>Reset</button>

      <h3>Making the store</h3>
      <p>In <b>store.js</b>, or wherever you'd like to keep your store:</p>
      <ol>
        <li>Import the <b>makeStore()</b> function from <b>react-contexts-store</b>.</li>
        <li>Call <b>makeStore()</b> with an <b>initalState</b> object and an <b>actions</b> object to create a store.</li>
        <li>
          Export the following keys from the store:
          <ul>
            <li><b>StoreProvider</b> - React component for wrapping the portion of your app which can access this store.</li>
            <li><b>useDispatch</b> - React hook for dispatching store actions.</li>
            <li><b>useInt</b> - React hook for subscribing to the "int" value in store state, inferred from your <b>initialState</b>.</li>
          </ul>
          You could also export the key useStore, for subscribing to the root state object, but this is the least optimal in terms of update frequency so I don't advise it (more on that later).
        </li>
      </ol>
      <Code1/>

      <h3>Providing the store</h3>
      <p>Import and mount the <b>StoreProvider</b> component you exported from your store, ensuring that it wraps all of the components where you would like to use store functionality:</p>
      <Code2/>

      <h3>Using the store</h3>
      <ul>
        <li>Import and call the <b>useInt</b> hook in a component to subscribe to the value of the store key "int". This value is stable regardless of whether other state keys are updated, overcomming the primary optimisation headache of other context-store implementations.</li>
        <li>Import and call the <b>useDispatch</b> hook in a component to access the dispatch() function, for dispatching actions. This function has a stable value that will never trigger a re-render in components which subscribe to it, much like the output of the React useReducer hook which is its underlying source.</li>
      </ul>
      <Code3/>
    </div>
  )
}


// Wrap store and export
export default () => (
  <StoreProvider>
    <Demo1/>
  </StoreProvider>
)

const Code = ({ children }) => <pre>{ children.trim() }</pre>

// Example code blocks
const Code1 = () => <Code>{`
import { makeStore } from 'react-contexts-store';

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
`}</Code>

const Code2 = () => <Code>{`
import { StoreProvider } from './store'

export default () => (
  <App>
    <ExampleComponent1WhichCannotUseStore/>
    <StoreProvider>
      <ExampleComponent2WhichCanUseStore/>
      <ExampleComponent3WhichCanUseStore/>
    </StoreProvider>
  </App>
);
`}</Code>

const Code3 = () => <Code>{`
import { useDispatch, useInt } from './store'

export default () => {
  const dispatch = useDispatch();
  const int = useInt();

  return (
    <div>
      <p>Int: { int }</p>
      <button onClick={() => dispatch('increment')}>Increment</button>
      <button onClick={() => dispatch({ type: 'multiply', by: 2 })}>Double</button>
      <button onClick={() => dispatch({ type: 'multiply', by: int })}>Square</button>
      <button onClick={() => dispatch('reset')}>Reset</button>
    </div>
  );
};
`}</Code>


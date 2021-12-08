
import React, { useEffect } from 'react'

import {
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
} from './store'


const Demo1 = () => {
  const store = useStore();
  const dispatch = useDispatch();
  const int = useIntTest();

  useEffect(() => console.log('STORE'), [store]);
  useEffect(() => console.log('DISPATCH'), [dispatch]);
  useEffect(() => console.log('INT'), [int]);

  console.log('store:', store);

  return (
    <div>
      <h1>Context store</h1>
      <p>{ int }</p>
      <button onClick={() => dispatch('logRef')}>Test</button>
      <button onClick={() => dispatch('logComputed')}>Test2</button>
    </div>
  )
}

export default () => (
  <StoreProvider>
    <Demo1/>
  </StoreProvider>
)

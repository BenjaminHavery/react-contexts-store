
import React, { Component } from 'react'
import { render } from 'react-dom'

import Styles from 'Styles/main'
import Demo1 from 'Pages/Demo1/index'
import Demo2 from 'Pages/Demo2/index'
import Demo3 from 'Pages/Demo3/index'
import Demo4 from 'Pages/Demo4/index'

export default class Demo extends Component {
  render() {
    return <div>
      <h1>react-contexts-store</h1>
      <p>This is a tiny library of helper functions for creating performant React stores from simple syntax.</p>
      <p>It uses native hooks exclusively under the hood, no globals, but overcomes the well documented performance optimisation headaches attached to every other "context-store" Redux alternative I've seen.</p>
      <p>Optionally it provides extended store functionality, in the form of stable computed value selectors and dispatchable methods that allow action batching and/or async functionality.</p>

      <Demo1/>
      <Demo2/>
      <Demo3/>
      <Demo4/>

      <Styles/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))

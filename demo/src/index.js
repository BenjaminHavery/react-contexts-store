
import React, { Component } from 'react'
import { render } from 'react-dom'

import { StoreProvider } from 'Store'

import Layout from 'Components/Layout'
import UrlWatcher from 'Components/UrlWatcher'

import Styles from 'Styles/main'


export default class Demo extends Component {
  render() {
    return (
      <>
        <StoreProvider>
          <Layout/>
          <UrlWatcher/>
        </StoreProvider>
        <Styles/>
      </>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))

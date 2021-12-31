
import React, { Component } from 'react'
import { render } from 'react-dom'

import { StoreProvider } from 'Store'

import Page from 'Components/Page'
import Nav from 'Components/Nav'
import UrlWatcher from 'Components/UrlWatcher'

import Styles from 'Styles/main'


export default class Demo extends Component {
  render() {
    return (
      <>
        <StoreProvider>
          <UrlWatcher/>
          <Nav/>
          <Page/>
        </StoreProvider>
        <Styles/>
      </>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))

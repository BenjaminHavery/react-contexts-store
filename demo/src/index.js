
import React, { Component } from 'react'
import { render } from 'react-dom'

import { StoreProvider } from 'Store'

import Page from 'Components/Page'
import Nav from 'Components/Nav'

import Styles from 'Styles/main'


export default class Demo extends Component {
  render() {
    return (
      <>
        <StoreProvider>
          <Nav/>
          <Page/>
        </StoreProvider>
        <Styles/>
      </>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))

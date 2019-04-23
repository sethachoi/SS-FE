import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import styled from 'styled-components'

import { Grid, Typography } from '@material-ui/core'

import Routes from './routes'
import { NavBar } from './ui'

const AppContainer = styled(Grid)({
  height: '100vh',
  width: '100%'
})

class App extends Component {
  render() {
    return (
      <AppContainer container direction="column">
        <Router>
          <NavBar />
          <Routes />
        </Router>
      </AppContainer>
    )
  }
}

export default App

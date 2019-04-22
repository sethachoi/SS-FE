import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styled from 'styled-components'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { Users, List } from './scenes'
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
          <Route path="/" exact component={Users} />
          <Route path="/list" component={List} />
        </Router>
      </AppContainer>
    )
  }
}

export default App

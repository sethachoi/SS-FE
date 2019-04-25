import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import styled from 'styled-components'

import { Grid } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blueGrey, red } from '@material-ui/core/colors'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'

import Routes from 'routes'
import { NavBar } from 'ui'

const AppContainer = styled(Grid)({
  height: '100vh',
  width: '100%'
})

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: red
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AppContainer container direction="column">
            <Router>
              <NavBar />
              <Routes />
            </Router>
          </AppContainer>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    )
  }
}

export default App

import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import { UsersList, TodoList } from 'scenes'

const RouteContainer = styled.div({
  flexGrow: '1',
  marginTop: '8px'
})

const Routes = () => (
  <RouteContainer>
    <Route path="/" exact component={UsersList} />
    <Route path="/:id/list" component={TodoList} />
  </RouteContainer>
)

export default Routes

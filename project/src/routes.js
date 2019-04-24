import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import { UsersList, TodoList, CreateTodo } from 'scenes'

const RouteContainer = styled.div({
  flexGrow: '1',
  marginTop: '8px'
})

const Routes = () => (
  <RouteContainer>
    <Route path="/" exact component={UsersList} />
    <Route path="/:id/list" component={TodoList} />
    <Route path="/:id/create" component={CreateTodo} />
  </RouteContainer>
)

export default Routes
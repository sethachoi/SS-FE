import React, { Component } from 'react'
import { compose } from 'recompose'
import { Link, Redirect } from 'react-router-dom'

import { Button } from '@material-ui/core'

import { SceneLayout } from 'ui'
import { withUser } from 'state/actions'
import { getUserTodos } from 'api/todoEndpoints'

const imageUrl = 'https://images.unsplash.com/photo-1525629545813-e4e7ba89e506?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'

class TodoList extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      const resp = await getUserTodos(this.props.user.id)
      console.log(resp)
    } catch (e) {
      
    }
  }

  render() {
    return (
      <SceneLayout sideImage={imageUrl}>
        {!this.props.user.id && (
          <Redirect to="/" />
        )}
        <div>
          <p>This is your Todo List</p>
          <Link to={`/${this.props.user.id}/create`}>
            <Button variant="contained" color="primary">
              Create New Task
            </Button>
          </Link>
        </div>
      </SceneLayout>
    )
  }
}

export default compose(withUser)(TodoList)
import React, { Component } from 'react'
import { compose } from 'recompose'

import { Button } from '@material-ui/core'

import { SceneLayout } from '../../ui'
import { withUser } from '../../state/actions'

const imageUrl = 'https://images.unsplash.com/photo-1525629545813-e4e7ba89e506?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'

class TodoList extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  render() {
    return (
      <SceneLayout sideImage={imageUrl}>
        <div>
          <p>This is your Todo List</p>
        </div>
      </SceneLayout>
    )
  }
}

export default compose(withUser)(TodoList)
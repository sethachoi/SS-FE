import React, { Component } from 'react'

import { SceneLayout } from '../../ui'

const imageUrl = 'https://cdn.pixabay.com/photo/2016/03/24/13/45/coffee-1276778_1280.jpg'

export default class Users extends Component {
  render() {
    return (
      <SceneLayout sideImage={imageUrl}>
        <div>
          <p>This is your Users List</p>
        </div>
      </SceneLayout>
    )
  }
}
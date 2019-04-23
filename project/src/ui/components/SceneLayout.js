import React, { Component } from 'react'
import styled from 'styled-components'

import { Grid } from '@material-ui/core'

import blueGrey from '@material-ui/core/colors/blueGrey'

type Props = {
  children: any,
  sideImage: string
}

const overlayColor = blueGrey[200]

const ImageOverlay = styled.div({
  backgroundColor: overlayColor,
  opacity: '0.12',
  width: '100%',
  height: '100%',
  position: 'absolute'
})

const SceneGrid = styled(Grid)({
  height: '100%',
  marginTop: '8px'
})

const SideImage = styled.div(({ src }) => ({
  backgroundImage: `url(${src})`,
  width: '100%',
  height: '100%',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  marginLeft: '-8px',
  position: 'relative'
}))

const SceneLayout = ({ children, sideImage }: Props) => (
  <SceneGrid container spacing={16}>
    <Grid item xs={4}>
      <SideImage src={sideImage}>
        <ImageOverlay />
      </SideImage>>
    </Grid>
    <Grid item xs={8}>
      {children}
    </Grid>
  </SceneGrid>
)

export default SceneLayout

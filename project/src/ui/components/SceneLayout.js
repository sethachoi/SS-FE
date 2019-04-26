import React from 'react'
import styled from 'styled-components'

import { Grid, Typography } from '@material-ui/core'

import blueGrey from '@material-ui/core/colors/blueGrey'

type Props = {
  children: any,
  sideImage: string,
  text: string,
  subtext: string
}

const overlayColor = blueGrey[200]

const StyledText = styled(Typography)({
  position: 'absolute',
  bottom: '0',
  padding: '32px',
  color: 'white !important'
})

const StyledSubText = styled(Typography)({
  color: 'white !important'
})

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

const ContentGrid = styled(Grid)({
  padding: '36px !important',
  marginLeft: '-8px !important'
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

const SceneLayout = ({ children, sideImage, text, subtext }: Props) => (
  <SceneGrid container spacing={16}>
    <Grid item xs={4}>
      <SideImage src={sideImage}>
        <ImageOverlay />
        <StyledText variant="h2">
          {text}
          <StyledSubText variant="h5">
            {subtext}
          </StyledSubText>
        </StyledText>
      </SideImage>
    </Grid>
    <ContentGrid container item xs={8}>
      {children}
    </ContentGrid>
  </SceneGrid>
)

export default SceneLayout

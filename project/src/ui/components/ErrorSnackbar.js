import React from 'react'
import styled from 'styled-components'

import { Snackbar, IconButton } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'
import CloseIcon from '@material-ui/icons/Close'

type Props = {
  show: Boolean,
  toggleError: Function,
  errorMessage: String
}

const ErrorWrapper = styled.span({
  display: 'flex',
  alignItems: 'center'
})

const ErrorText = styled.span({
  margin: '0 16px'
})

const ErrorSnackbar = (props: Props) => {
  const { show, toggleError, errorMessage } = props

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={show}
      autoHideDuration={6000}
      onClose={toggleError}
      message={<ErrorWrapper><ErrorIcon /><ErrorText>{errorMessage}</ErrorText></ErrorWrapper>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={toggleError}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  )
}

export default ErrorSnackbar

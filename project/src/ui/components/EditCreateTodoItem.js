import React from 'react'
import styled from 'styled-components'

import { TextField, Grid, Divider } from '@material-ui/core'
import { DatePicker } from 'material-ui-pickers'

type Props = {
  name: String,
  handleChange: Function,
  handleDateChange: Function,
  date: String,
  description: String,
  divider: Boolean
}

const PaddedGrid = styled(Grid)({
  padding: '16px'
})

const EditCreateTodoItem = (props:Props) => {
  const {
    name,
    handleChange,
    handleDateChange,
    date,
    description,
    divider
  } = props
  return (
    <div>
      <PaddedGrid container spacing={16}>
        <Grid item xs={4}>
          <TextField
            label="Task Name"
            value={name}
            onChange={handleChange('name')}
            margin="normal"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={4}>
          <DatePicker
            margin="normal"
            label="Date"
            value={date}
            onChange={handleDateChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            multiline
            rowsMax="4"
            label="Description"
            value={description}
            onChange={handleChange('description')}
            margin="normal"
            fullWidth
          />
        </Grid>
      </PaddedGrid>
      {divider && <Divider light />}
    </div>
  )
}

export default EditCreateTodoItem

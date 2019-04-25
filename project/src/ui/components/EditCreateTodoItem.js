import React from 'react'

import { TextField, Grid } from '@material-ui/core'
import { DatePicker } from 'material-ui-pickers'

type Props = {
  name: String,
  handleChange: Function,
  handleDateChange: Function,
  date: String,
  description: String
}

const EditCreateTodoItem = (props:Props) => {
  const { name, handleChange, handleDateChange, date, description } = props
  return (
    <Grid container spacing={16}>
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
    </Grid>
  )
}

export default EditCreateTodoItem

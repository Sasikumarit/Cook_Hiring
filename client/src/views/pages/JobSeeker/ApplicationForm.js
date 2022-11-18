import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function ApplicationForm() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField required id="jobseekername" label="Name" defaultValue="" />
        <TextField required id="location" label="Location" defaultValue="" />
        <TextField required id="mobileno" label="Mobile Number" />
        <TextField id="email" label="Email Address" defaultValue="" />
        <TextField
          id=""
          yearofxp
          label="Year(s) of Experience"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Grid container justifyContent="flex-end">
          <Button variant="contained">Apply</Button>
        </Grid>
      </div>
    </Box>
  );
}

export default ApplicationForm;

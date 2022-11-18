import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function PostJob() {
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
        <TextField required id="jobdescription" label="Job's Description" defaultValue="" />
        <TextField required id="location" label="Location" defaultValue="" />
        <TextField required id="fromdate" label="From Date" />
        <TextField required id="todate" label="To Date" />
        <TextField required id="wageperday" label="Wage/Pay (per day)" />
        <TextField required id="mobileno" label="Mobile Number" />

        <Grid container justifyContent="flex-end">
          <Button variant="contained">Post Job</Button>
        </Grid>
      </div>
    </Box>
  );
}

export default PostJob;

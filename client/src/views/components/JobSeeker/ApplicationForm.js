import React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import _ from 'lodash'
import axios from "axios";
import { toast } from "react-toastify";

const ApplicationForm=({user,handleCloseNavMenu,selectedJobData})=> {

  const initialState={
    jobseekername:'',
    location:'',
    mobileno:'',
    email:'',
    yearofxp:'',
    applieduserid:user.id,
    jobid:selectedJobData.id
  }

  const [state, setState]=useState(initialState);
  
  const onChangeHandler=(event,controlid,controlvalue)=>{
    const {id,value}=event.target;
    setState({...state,[id]:value})
  }

  const onSubmitHandler=()=>{
    if(_.isEmpty(state.jobseekername)||_.isEmpty(state.location)||_.isEmpty(state.mobileno)||_.isEmpty(state.email)||_.isEmpty(state.yearofxp)){
      toast.error("Please enter all manadatory data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else{
      document.getElementById("btn_login").disabled = true;
      axios.post(process.env.REACT_APP_ServerHost + `jobseeker`,state)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Job Saved Successfully.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setState(initialState)
          handleCloseNavMenu("Applied Jobs");
        }
      })
      .catch((ex) => {
        toast.error("Failed to Save date.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .finally(() => {
        document.getElementById("btn_login").disabled = false;
      });
    }
  }

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
        <TextField required id="jobseekername" label="Name" value={state.jobseekername} onChange={onChangeHandler} />
        <TextField required id="location" label="Location" value={state.location} onChange={onChangeHandler} />
        <TextField required id="mobileno" label="Mobile Number"value={state.mobileno} onChange={onChangeHandler} />
        <TextField id="email" label="Email Address"  value={state.email} onChange={onChangeHandler} />
        <TextField
          id="yearofxp"
          value={state.yearofxp}
          label="Year(s) of Experience"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChangeHandler} 
        />
        <Grid container justifyContent="flex-end">
          <Button variant="contained" id="btn_login" onClick={()=> onSubmitHandler()}>Apply</Button>
        </Grid>
      </div>
    </Box>
  );
}

export default ApplicationForm;

import React, { useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/Button/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from '@mui/material/FormControl';

import "../../../styles/styles.css";

const Register = () => {
  const [state, setState] = useState({ email: "", password: "", userrole: "" });

  const handleChange = (e) => {
    setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  return (
    <div className="Register">
      <div className="form">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="userrole">Enter admin/customer/cook</InputLabel>
        <Select
          labelId="userrole"
          id="userrole"
          value={state.userrole}
          onChange={handleChange}
          label="Enter admin/customer/cook"
        >
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"customer"}>Customer</MenuItem>
          <MenuItem value={"cook"}>Cook</MenuItem>
        </Select>
        </FormControl>

        <CustomInput
          labelText="Email"
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type="text"
        />
        <CustomInput
          labelText="Enter Username"
          id="username"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type="text"
        />
        <CustomInput
          labelText="Enter Mobilenumber"
          id="mobilenumber"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type="number"
        />
        <CustomInput
          labelText="Password"
          id="password"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type="password"
        />
        <CustomInput
          labelText="Password"
          id="password"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type="password"
        />
        <Button type="button" color="primary" className="form__custom-button">
          Register
        </Button>
        <p>
          Already a user?<a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

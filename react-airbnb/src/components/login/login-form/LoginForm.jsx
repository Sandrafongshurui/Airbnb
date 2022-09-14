import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box } from "@mui/material";
import "bootstrap";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  let navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [catchError, setCatchError] = useState(null);
  // form validation rules
  const validationSchema = yup.object().shape({
    email: yup.string().email("Valid email is required").required(),
    password: yup.string().min(4, "Mininum 4 characters").required(),
  });

  //actual input names
  const defaultValues = {
    email: "",
    password: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues });

  const onSubmit = async (data) => {
    console.log("send data:", data);
    setCatchError(null);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        data
      );
      console.log("Server Respond:", res);
      console.log("token", res.data.token);

      if (res.status === 200 || res.status === 201) {
        // store the token into localstorage / cookie
        localStorage.setItem("user_token", res.data.token);
        //close the portal, site header change to token bearer name
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      // display an error
      console.log(error.response.data.error);
      setCatchError(error.response.data.error);
    }
  };

  return (
    <div className="p-3 mb-2">
      {catchError && (
        <div>
          <h4 style={{ color: "red", textAlign: "center" }}>{catchError}</h4>
        </div>
      )}
      <div>
        <h1 className="text-center pb-3 m-0 mb-3">Login</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Controller
            name="email" //actual input
            control={control} //take place of the register RHF
            render={({
              //takes a function and rturn a react element
              field: { onChange, value },
              fieldState: { isDirty, error }, //this error will be displyed in formstate errors
            }) => (
              <TextField
                onChange={onChange} // send value to hook form
                value={value}
                label={"email"} //label in the box
                variant="outlined"
                fullWidth
                autoComplete="email"
                autoFocus
                error={!!error} //convert obj into a bool
                helperText={error ? error.message : null}
              />
            )}
          />
        </Box>
        <Box mb={3}>
          <Controller
            name="password" //actual input
            control={control} //take place of the register RHF
            render={({
              //takes a function and rturn a react element
              field: { onChange, value },
              fieldState: { isDirty, error }, //this error will be displyed in formstate errors
            }) => (
              <TextField
                onChange={onChange} // send value to hook form
                value={value}
                label={"password"} //label in the box
                variant="outlined"
                fullWidth
                autoComplete="password"
                autoFocus
                error={!!error} //convert obj into a bool
                helperText={error ? error.message : null}
              />
            )}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;

import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box } from "@mui/material";
import "bootstrap";
import { Controller, useForm } from "react-hook-form";



const LoginForm = (props) => {
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
    console.log("From loginform:", data);
    props.data(data);
  };

  return (
    <div>
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
              field//this error will be displyed takes over form state errors
            }) => (
              <TextField
                label={"email"} //label in the box
                variant="outlined"
                fullWidth
                autoComplete="email"
                autoFocus
                // error={!!error} //convert obj into a bool
                // helperText={error ? error.message : null}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                {...field}
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
              field//this error will be displyed takes over form state errors
            }) => (
              <TextField
                label={"password"} //label in the box
                variant="outlined"
                fullWidth
                autoComplete="password"
                autoFocus
                // error={!!error} //convert obj into a bool
                // helperText={error ? error.message : null}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
                {...field}
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

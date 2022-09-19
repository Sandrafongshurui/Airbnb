import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import "bootstrap";
import { Controller, useForm } from "react-hook-form";

const RegisterForm = (props) => {
  // form validation rules
  const validationSchema = yup.object().shape({
    firstname: yup.string().min(4, "Mininum 4 characters").required(),
    lastname: yup.string().min(2, "Mininum 2 characters").required(),
    gender: yup.string().required(),
    email: yup.string().email("Valid email is required").required(),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Mininum 4 characters"),
    confirmpassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    about_me: yup.string().required("About Me is required"),
  });

  //actual input names
  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    about_me: "",
    password: "",
    confirmpassword: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues });

  const onSubmit = async (data) => {
    console.log("From RegisterForm:", data);
    await props.data(data);
  };

  return (
    <div>
      <div>
        <h1 className="text-center pb-3 m-0 mb-3">Register</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Controller
            name="firstname" //actual input
            control={control} //take place of the register RHF
            render={({
              //takes a function and rturn a react element
              field//this error will be displyed in formstate errors
            }) => (
              <TextField
                // onChange={onChange} // send value to hook form
                // value={value}
                label={"First Name"} //label in the box
                variant="outlined"
                fullWidth
                autoComplete="firstname"
                autoFocus
                // error={!!error} //convert obj into a bool
                // helperText={error ? error.message : null}
                error={errors.firstname ? true : false}
                helperText = {errors.firstname?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box mb={3}>
          <Controller
            name="lastname" //actual input
            control={control} //take place of the register RHF
            render={({
              field//this error will be displyed in formstate errors
            }) => (
              <TextField
                label={"Last Name"} //label in the box
                variant="outlined"
                fullWidth
                autoComplete="lastname"
                autoFocus
                // error={!!error} //convert obj into a bool
                // helperText={error ? error.message : null}
                error={errors.lastname? true : false}
                helperText = {errors.lastname?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box mb={3}>
          <Controller
            name="email" //actual input
            control={control} //take place of the register RHF
            render={({
              field //this error will be displyed in formstate errors
            }) => (
              <TextField
                label={"Email"} //label in the box
                variant="outlined"
                fullWidth
                autoComplete="email"
                autoFocus
                // error={!!error} //convert obj into a bool
                // helperText={error ? error.message : null}
                error={errors.email ? true : false}
                helperText = {errors.email?.message}
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
              field //this error will be displyed in formstate errors
            }) => (
              <TextField
                label={"Password"} //label in the box
                variant="outlined"
                fullWidth
                autoComplete="password"
                autoFocus
                // error={!!error} //convert obj into a bool
                // helperText={error ? error.message : null}
                error={errors.password ? true : false}
                helperText = {errors.password?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box mb={3}>
          <Controller
            name="confirmpassword" //actual input
            control={control} //take place of the register RHF
            render={({ field }) => (
              <TextField
                label={"Confirm Password"} //label in the box
                variant="outlined"
                fullWidth
                autoComplete="confirmpassword"
                autoFocus
                // error={!!error} //convert obj into a bool
                // helperText={error ? error.message : null}
                error={errors.confirmpassword ? true : false}
                helperText = {errors.confirmpassword?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box mb={3}>
          <Controller
            name="gender" //actual input
            control={control} //take place of the register RHF
            render={({
              //takes a function and rturn a react element
              field,
            }) => (
              <RadioGroup defaultValue="male" row={true}>
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                 
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"                 
                />              
              </RadioGroup>
            )}
          />
        </Box>
        <Box mb={3}>
          <Controller
            name="about_me" //actual input
            control={control} //take place of the register RHF
            render={({ field }) => (
              <TextField
                label={"Write a brief description about yourself"} //label in the box
                variant="outlined"
                rows={4}
                //multiline={true}
                fullWidth
                autoFocus
                // error={!!error} //convert obj into a bool
                // helperText={error ? error.message : null}
                error={errors.about_me ? true : false}
                helperText = {errors.about_me?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;

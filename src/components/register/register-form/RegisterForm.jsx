import React,{useState} from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Box,
  InputAdornment
} from "@mui/material";
import "bootstrap";
import { Controller, useForm } from "react-hook-form";
import { FormControl } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import style from "./LoginForm.module.css"
const eye = <FontAwesomeIcon icon={faEye} />;

const RegisterForm = (props) => {
  // form validation rules
  const validationSchema = yup.object().shape({
    firstname: yup.string().min(4, "Mininum 4 characters").required(),
    lastname: yup.string().min(2, "Mininum 2 characters").required(),
    // gender: yup.string().required("Gender is required"),
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

  const [passwordShow, setPasswordShow] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShow(passwordShow ? false : true);
  };
  const [confirmpasswordShow, setConfirmPasswordShow] = useState(false);
  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordShow(confirmpasswordShow ? false : true);
  };

  //actual input names
  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    // gender: "",
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
    props.data(data);
  };

  //  // Options
  //  const options = [
  //   {
  //     title: "Male"
  //   },
  //   {
  //     title: "Female"
  //   }
  // ];

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
              field, //this error will be displyed in formstate errors
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
                helperText={errors.password?.message}
                type={passwordShow ? "text" : "password"}
                {...field}
                InputProps={{ // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                     <i onClick={togglePasswordVisiblity}>{eye}</i>{" "}
                    </InputAdornment>
                  )
                }}
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
                helperText={errors.confirmpassword?.message}
                {...field}
                type={confirmpasswordShow? "text" : "confirmpassword"}
                InputProps={{ // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                     <i onClick={toggleConfirmPasswordVisiblity}>{eye}</i>{" "}
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Box>
        {/* <Box mb={3} >
          <Controller
            name="gender" //actual input
            control={control} //take place of the register RHF
            rules={{ required: "Please make a selection." }}
            render={({
              //takes a function and rturn a react element
              field,
            }) => (
            //   <Select
            //   labelId="demo-simple-select-required-label"
            //   id="demo-simple-select-required"
            //   // value={age}
            //   label="Age *"
            //   {...field}
            //   // onChange={handleChange}
            // >
            //   <MenuItem value="">
            //     <em>None</em>
            //   </MenuItem>
            //   <MenuItem value={10}>Ten</MenuItem>
            //   <MenuItem value={20}>Twenty</MenuItem>
            //   <MenuItem value={30}>Thirty</MenuItem>
            // </Select>
            //   <RadioGroup >
            //   {options.map((option, i) => (
            //     <FormControlLabel  {...field} 
            //       value={option.title}
            //       control={<Radio />}
            //       label={option.title}
            //       key={i}
            //     />
            //   ))}
            // </RadioGroup>
              <RadioGroup {...field} row={true} >

                <FormControl >
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
                </FormControl>
               
              </RadioGroup>
            )}
          />
        </Box> */}
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
                helperText={errors.about_me?.message}
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

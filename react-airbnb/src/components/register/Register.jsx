import React, { useState, useCallback } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../modal/Modal";
import {
  TextField,
  Container,
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import "bootstrap";
import { Controller, useForm } from "react-hook-form";

const Register = (props) => {
  // form validation rules
  const validationSchema = yup.object().shape({
    firstname: yup.string().min(3, "Mininum 4 characters").required(),
    lastname: yup.string().min(2, "Mininum 2 characters").required(),
    gender: yup.string().required(),
    email: yup.string().email("Valid email is required").required(),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmpassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    about_me: yup.string().required(),
  });

  //actual input names
   const defaultValues = {
    firstname: "",
    lastname: "",
    gender:"",
    about_me:"",
    password: "",
    confirmpassword: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues });

  const [open, setOpen] = useState(true);

  const onSubmit = async (data) => {
    console.log("send data:", data);
    // try {
    //   const res = await axios.post(
    //     "http://localhost:8000/api/v1/user/login",
    //     data
    //   );
    //   console.log("Server Respond:", res);
    //   console.log("token", res.data.token);

    //   if (res.status === 200 || res.status === 201) {
    //     //close the portal, site header change to token bearer name
    //     setOpen(false)

    //   }

    // } catch (error) {
    //   console.log(error)
    //   // display an error
    //   console.log(error.response.data.error)
    // }
  };

  return (
    <div className="Register">
      <Modal open={open}>
        <Box justifyContent="center" alignItems="center">
          <div className="modal-header">
            <h1 className="ms-4">Register</h1>
            <button
              className="close-button"
              onClick={() => props.toggle(false)}
            >
              &times;
            </button>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={3}>
                <Controller                 
                  name ="firstname" //actual input
                  control={control} //take place of the register RHF
                  // rules={{
                  // required: "Required field",
                  // minLength: {value: 4, message:"Minimum 4 characters"},
                  // }}
                  render={({
                    //takes a function and rturn a react element
                    field: { onChange, value },
                    fieldState: { isDirty, error }, //this error will be displyed in formstate errors
                  }) => (
                    <FormControl fullWidth={true}>
                      {/* <FormLabel>First Name</FormLabel> */}
                      <TextField
                        onChange={onChange} // send value to hook form
                        value={value}
                        label={"First Name"} //label in the box
                        variant="outlined"
                        fullWidth
                        autoComplete="firstname"
                        autoFocus
                        error={!!error} //convert obj into a bool
                        helperText={error ? error.message : null}
                      />
                    </FormControl>
                  )}
                />
              </Box>
              <Box mb={3}>
                <Controller
                  name="lastname" //actual input
                  control={control} //take place of the register RHF
                  // rules={{
                  // required: "Required field",
                  // minLength: {value: 4, message:"Minimum 4 characters"},
                  // }}
                  render={({
                    //takes a function and rturn a react element
                    field: { onChange, value },
                    fieldState: { isDirty, error }, //this error will be displyed in formstate errors
                  }) => (
                    <FormControl fullWidth={true}>
                      {/* <FormLabel>Last Name</FormLabel> */}
                      <TextField
                        onChange={onChange} // send value to hook form
                        value={value}
                        label={"Last Name"} //label in the box
                        variant="outlined"
                        autoComplete="lastname"
                        autoFocus
                        error={!!error} //convert obj into a bool
                        helperText={error ? error.message : null}
                      />
                    </FormControl>
                  )}
                />
              </Box>
              <Box mb={3}>
                <Controller
                  name="email" //actual input
                  control={control} //take place of the register RHF
                  // rules={{
                  //   required: "Required field",
                  //   pattern: {
                  //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //     message: "Invalid email address",
                  //   }, }}
                  render={({
                    //takes a function and rturn a react element
                    field: { onChange, value },
                    fieldState: { isDirty, error }, //this error will be displyed in formstate errors
                  }) => (
                    <FormControl fullWidth={true}>
                      {/* <FormLabel>Last Name</FormLabel> */}
                      <TextField
                        onChange={onChange} // send value to hook form
                        value={value}
                        label={"Email"} //label in the box
                        variant="outlined"
                        autoComplete="email"
                        autoFocus
                        error={!!error} //convert obj into a bool
                        helperText={error ? error.message : null}
                      />
                    </FormControl>
                  )}
                />
              </Box>
              <Box mb={3}>
                <Controller
                  name="password" //actual input
                  control={control} //take place of the register RHF
                  // rules={{
                  //   required: "Required field",
                  //   minLength: {value: 4, message: "Mininum 4 chracters"}
                  //   }}
                  render={({
                    //takes a function and rturn a react element
                    field: { onChange, value },
                    fieldState: { isDirty, error }, //this error will be displyed in formstate errors
                  }) => (
                    <FormControl fullWidth={true}>
                      {/* <FormLabel>Last Name</FormLabel> */}
                      <TextField
                        onChange={onChange} // send value to hook form
                        value={value}
                        label={"Password"} //label in the box
                        variant="outlined"
                        autoComplete="password"
                        autoFocus
                        error={!!error} //convert obj into a bool
                        helperText={error ? error.message : null}
                      />
                    </FormControl>
                  )}
                />
              </Box>
              <Box mb={3}>
                <Controller
                  name="confirmpassword" //actual input
                  control={control} //take place of the register RHF
                  // rules={{
                  //   required: "Required field",
                  //   minLength: {value: 4, message: "Mininum 4 chracters"},
                  //   validate: value =>
                  //   value === password.current || "The passwords do not match"

                  //   }}
                  render={({
                    //takes a function and rturn a react element
                    field: { onChange, value },
                    fieldState: { isDirty, error }, //this error will be displyed in formstate errors
                  }) => (
                    <FormControl fullWidth={true}>
                      {/* <FormLabel>Last Name</FormLabel> */}
                      <TextField
                        onChange={onChange} // send value to hook form
                        value={value}
                        label={"Confirm Password"} //label in the box
                        variant="outlined"
                        autoComplete="confirmpassword"
                        autoFocus
                        error={!!error} //convert obj into a bool
                        helperText={error ? error.message : null}
                      />
                    </FormControl>
                  )}
                />
              </Box>
              <Box mb={3}>
                <Controller
                  name="gender" //actual input
                  control={control} //take place of the register RHF
                  // rules={{
                  // required: "Required field",
                  // minLength: {value: 4, message:"Minimum 4 characters"},

                  // }}
                  render={({
                    //takes a function and rturn a react element
                    field: { onChange, value },
                  }) => (
                    <FormControl fullWidth={true}>
                      <FormLabel>Gender</FormLabel>
                      <RadioGroup
                        value={value}
                        onChange={onChange}
                        defaultChecked="female"
                        row={true}
                      >
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
                    </FormControl>
                  )}
                />
              </Box>
              <Box mb={3}>
                <Controller
                  name="about_me" //actual input
                  control={control} //take place of the register RHF
                  // rules={{
                  // required: "Required field",
                  // minLength: {value: 10, message:"Minimum 10 characters"},
                  // }}
                  render={({
                    //takes a function and rturn a react element
                    field: { onChange, value },
                    fieldState: { isDirty, error }, //this error will be displyed in formstate errors
                  }) => (
                    <TextField
                      onChange={onChange} // send value to hook form
                      value={value}
                      label={"Write a brief description about yourself"} //label in the box
                      variant="outlined"
                      //multiline
                      rows={4}
                      fullWidth
                      autoFocus
                      error={!!error} //convert obj into a bool
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Register;

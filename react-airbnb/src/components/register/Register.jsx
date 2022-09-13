import React, { useState, useCallback } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../modal/Modal";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  TextareaAutosize,
} from "@mui/material";
import "bootstrap";
import { Controller, useForm } from "react-hook-form";

const Register = (props) => {
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

  const [open, setOpen] = useState(true);
  const [catchError, setCatchError] = useState(null);

  const onSubmit = async (data) => {
    console.log("send data:", data);
    setCatchError(null);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        data
      );
      console.log("Server Respond:", res);

      if (res.status === 200 || res.status === 201) {
        //close the portal, site header change to token bearer name
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      // display an error
      console.log(error.response.data.error);
      setCatchError(error.response.data.error);
    }
  };

  return (
    <div className="Register">
      <Modal open={open}>
        {catchError && (
          <div>
            <h4 style={{ color: "red", textAlign: "center" }}>{catchError}</h4>
          </div>
        )}
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
                  name="firstname" //actual input
                  control={control} //take place of the register RHF
                  render={({
                    //takes a function and rturn a react element
                    field: { onChange, value },
                    fieldState: { isDirty, error }, //this error will be displyed in formstate errors
                  }) => (
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
                  )}
                />
              </Box>
              <Box mb={3}>
                <Controller
                  name="lastname" //actual input
                  control={control} //take place of the register RHF
                  render={({
                    field: { onChange, value },
                    fieldState: { isDirty, error }, //this error will be displyed in formstate errors
                  }) => (
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
                  )}
                />
              </Box>
              <Box mb={3}>
                <Controller
                  name="email" //actual input
                  control={control} //take place of the register RHF
                  render={({
                    field: { onChange, value },
                    fieldState: { error }, //this error will be displyed in formstate errors
                  }) => (
                    <TextField
                      onChange={onChange}
                      value={value}
                      label={"Email"} //label in the box
                      variant="outlined"
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
                    field: { onChange, value },
                    fieldState: { error }, //this error will be displyed in formstate errors
                  }) => (
                    <TextField
                      onChange={onChange}
                      value={value}
                      label={"Password"} //label in the box
                      variant="outlined"
                      autoComplete="password"
                      autoFocus
                      error={!!error} //convert obj into a bool
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              </Box>
              <Box mb={3}>
                <Controller
                  name="confirmpassword" //actual input
                  control={control} //take place of the register RHF
                  render={({
                    field: { onChange, value },
                    fieldState: { error }, //this error will be displyed in formstate errors
                  }) => (
                    <TextField
                      onChange={onChange}
                      value={value}
                      label={"Confirm Password"} //label in the box
                      variant="outlined"
                      autoComplete="confirmpassword"
                      autoFocus
                      error={!!error} //convert obj into a bool
                      helperText={error ? error.message : null}
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
                    <RadioGroup defaultValue="female" row={true}>
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
                  render={({
                    field: { onChange, value },
                    fieldState: { error }, //this error will be displyed in formstate errors
                  }) => (
                    //   <TextareaAutosize
                    //   aria-label="minimum height"
                    //   minRows={3}
                    //   placeholder="Minimum 3 rows"
                    //   style={{ width: 400 }}
                    // />
                    <TextField
                      onChange={onChange} // send value to hook form
                      value={value}
                      label={"Write a brief description about yourself"} //label in the box
                      variant="outlined"
                      rows={4}
                      //multiline={true}
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

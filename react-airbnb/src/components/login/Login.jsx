import React, { useState, useCallback } from "react";
// import useToggle from "../../useToggle";
import Modal from "../modal/Modal";
import { TextField, Container, Button, Box } from "@mui/material";
import "bootstrap";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
//{resolver: yupResolver(schema)}
const Login = (props) => {
  //actual input names
  const defaultValues = {
    email: "",
    password : ""
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues});
 
  //use toggle is a memomized funtion, so it only renders whens setOpen is called
  //ie if on username change, by right rerenders whole component, but memomized, so it wont
  const [open, setOpen] = useState(true);
  //const [formData, setFormData] = useState();
  console.log(open);

  // const headerOptions = {
  //   "Content-Type": "application/json",
  //   Authorization: "Bearer " + didToken,
  // }

  const onSubmit = async (data) => {
    console.log("send data:", data);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        data
      );
      console.log("Server Respond:", res);
      console.log("token", res.data.token);
      
      if (res.status === 200 || res.status === 201) {
        //close the portal, site header change to token bearer name
        setOpen(false)

      } 

    } catch (error) {
      console.log(error)
      // display an error
      console.log(error.response.data.error)
    }

  };

  return (
    <div className="Login">
      {/* <h1>Hello CodeSandbox</h1>
      <button type="button" onClick={openModal}>
        Open Modal
      </button> */}
      {/* A modal component which will be used by other components / pages */}

      <Modal open={open}>
        <Box justifyContent="center" alignItems="center">
          <div className="modal-header">
            <h1 className="ms-4">Login</h1>
            <button
              className="close-button"
              onClick={() => props.toggle(false)}
            >
              &times;
            </button>
          </div>
          <div>
            <form  onSubmit={handleSubmit(onSubmit)}>
              <Box mb={3}>
                <Controller
                  name="email"//actual input
                  control={control}//take place of the register RHF
                  rules={{ 
                  required: "Required field",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  }, }}
                  render={({//takes a function and rturn a react element
                    field: { onChange, value},
                    fieldState: {isDirty, error },//this error will be displyed in formstate errors
                  }) => (
                    <TextField
                    onChange={onChange} // send value to hook form
                    value={value}
                    label={"email"}//label in the box
                    variant="outlined"
                    fullWidth
                    autoComplete="password"
                    autoFocus
                    error={!!error}//convert obj into a bool
                    helperText={error ? error.message : null}
                    />
                  )}
                />              
              </Box>
              <Box mb={3}>
                <Controller
                  name="password"//actual input
                  control={control}//take place of the register RHF
                  rules={{ 
                  required: "Required field",
                  minLength: {value: 4, message: "Mininum 4 chracters"}
                  }}
                  render={({//takes a function and rturn a react element
                    field: { onChange, value},
                    fieldState: {isDirty, error },//this error will be displyed in formstate errors
                  }) => (
                    <TextField
                    onChange={onChange} // send value to hook form
                    value={value}
                    label={"password"}//label in the box
                    variant="outlined"
                    fullWidth
                    autoComplete="password"
                    autoFocus
                    error={!!error}//convert obj into a bool
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
                Login
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Login;

import React, { useState, useCallback } from "react";
// import useToggle from "../../useToggle";
import Modal from "../modal/Modal";
import {TextField, Container, Button, Box} from "@mui/material";
import "bootstrap"
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";

const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(true);

  const onSubmit = async ({ email }) => {
    //const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
    //const didToken = await magic.auth.loginWithMagicLink({ email });
    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + didToken,
    //   },
    //   body: JSON.stringify({ email }),
    // });
    // if (res.status === 200) {
    //   // redirect
    //   Router.push("/");
    // } else {
    //   // display an error
    // }
  };

  return (
    
    <div className="Register">
      {/* <h1>Hello CodeSandbox</h1>
      <button type="button" onClick={openModal}>
        Open Modal
      </button> */}
      {/* A modal component which will be used by other components / pages */}
      
        <Modal open={open} >
          <Box justifyContent="center" alignItems="center">
            <div className="modal-header">
              <h1 className="ms-4">Register</h1>
              <button className="close-button" onClick={() => props.toggle(false)}>
                  &times;
              </button>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <Box mb={2}>
                    <TextField
                      variant="outlined"
                      label="First Name"
                      fullWidth
                      autoComplete="First Name"
                      autoFocus
                      {...register("First Name", {
                        required: "Required field",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      error={!!errors?.email}
                      helperText={errors?.email ? errors.email.message : null}
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      variant="outlined"
                      label="Last Name"
                      fullWidth
                      autoComplete="Last Name"
                      autoFocus
                      {...register("Last Name", {
                        required: "Required field",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      error={!!errors?.email}
                      helperText={errors?.email ? errors.email.message : null}
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      variant="outlined"
                      label="email"
                      fullWidth
                      autoComplete="email"
                      autoFocus
                      {...register("email", {
                        required: "Required field",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      error={!!errors?.email}
                      helperText={errors?.email ? errors.email.message : null}
                    />
                  </Box>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
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

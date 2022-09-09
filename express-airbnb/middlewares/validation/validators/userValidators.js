const yup = require("yup");

const userValidator = {
  login: yup.object({
    body: yup.object({
      email: yup
        .string()
        .email("Valid email is required")
        .required("Email is required"),
      password: yup
        .string()
        .min(4, "Mininum 4 characters")
        .required("Password is required"),
    }),
  }),
  register: yup.object({
    body: yup.object({
      firstname: yup
        .string()
        .min(3, "Mininum 4 characters")
        .required("First Name is required"),
      lastname: yup
        .string()
        .min(2, "Mininum 2 characters")
        .required("Last Name is required"),
      gender: yup.string().required("Gender is required"),
      email: yup
        .string()
        .email("Valid email is required")
        .required("Email is required"),
      password: yup
        .string()
        .min(4, "Mininum 4 characters")
        .required("Password is required"),
      confirmpassword: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password")], "Your passwords do not match."),
      about_me: yup.string(),
      image: yup.string(),
    }),
  }),
};

module.exports = userValidator;

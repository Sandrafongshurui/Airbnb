const yup = require("yup");

const userValidator = {
  login: yup.object({
    body: yup.object({
      email: yup
        .string()
        .email("Valid email is required")
        .required(),
      password: yup
        .string()
        .min(4, "Mininum 4 characters")
        .required(),
    }),
  }),
  register: yup.object({
    body: yup.object({
      firstname: yup
        .string()
        .min(3, "Mininum 4 characters")
        .required(),
      lastname: yup
        .string()
        .min(2, "Mininum 2 characters")
        .required(),
      gender: yup.string().required(),
      email: yup
        .string()
        .email("Valid email is required")
        .required(),
      password: yup
        .string()
        .min(4, "Mininum 4 characters")
        .required(),
      confirmpassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Your passwords do not match."),
      about_me: yup.string(),
      image: yup.string(),
    }),
  }),
};

module.exports = userValidator;

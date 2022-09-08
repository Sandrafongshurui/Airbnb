const yup = require("yup");

const userValidator = {
    login : yup.object({
        body: yup.object({
            email: yup.string().email().required(),
            password: yup.string().min(4).required(),
    }),
    register: yup.object({
        firstname: yup.string().min(3).required(),
        lastname: yup.string().min(3).required(),
        email: yup.string().email().required(),
        password: yup.string().min(4).required(),
        confirmpassword: yup.string().required().valid(yup.ref('password')).min(4),
    }),
})
}
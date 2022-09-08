const yup = require("yup");

const listingSchema = yup.object({
  query: yup.object({
    country: yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  }),
});

module.exports = listingSchema;

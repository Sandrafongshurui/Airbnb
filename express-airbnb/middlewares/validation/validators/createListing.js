const yup = require("yup");

const createSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    property_type: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    accommodates: yup.number().required().min(1, "Min value 0."),
    bedrooms: yup.number().required(),
    beds: yup.number().required(),
    bathrooms: yup.number().required(),
    amenities: yup.string(),
    price: yup.number().required(),
    images_url: yup.string().required(),
    address_1: yup.string().required(),
    address_2: yup.string(),
    postal_code: yup.number().required(),
    state: yup
      .string()
      .required()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    country: yup
      .string()
      .required()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  }),
});

module.exports = createSchema;

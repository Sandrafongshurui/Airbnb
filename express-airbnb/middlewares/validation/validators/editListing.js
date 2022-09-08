const yup = require("yup");
const listingSchema = require("./createListing")

const editListingSchema = yup.object({
  params: yup.object({
    listing_id: yup.string().required().matches(/^([A-Za-z]|[0-9])+$/, "Only alphabets and numbers for listing Id")
  }),
  body: listingSchema.fields.body
});

module.exports = editListingSchema ;
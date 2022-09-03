const dataJson = require("./data.json");

const data = parseJSON(dataJson)

console.log(data)

const editListing = async () => {


  await listingModel.deleteMany({})
  await listingModel.create(dataJson);

  console.log(`Created listingss`);
};